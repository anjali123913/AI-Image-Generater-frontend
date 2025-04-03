import { useEffect, useState } from "react";
import axios from "axios";
import { Mic, MicOff } from "lucide-react";

export default function Form({ setImageUrl, setLoading }) {
  const [data, setData] = useState({
    author: "",
    prompt: "",
  });
  const [listening, setListening] = useState(false);
  let recognition;

  if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    generateImage();
  };

  const generateImage = async () => {
    try {
      const res = await axios.post(
        "https://image-pig-generator.onrender.com/api/generate-image",
        data
      );
      setImageUrl(res.data.image.imageUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setData((prevData) => ({ ...prevData, prompt: transcript }));
      };

      recognition.onend = () => {
        setListening(false);
      };
    }
  };

  return (
    <div>
      <div className="bg-white p-10 shadow-xl shadow-gray-600 md:w-[500px] w-full">
        <h1 className="font-semibold text-2xl py-1">
          Generate Image with Prompt
        </h1>
        <h3 className="text-lg py-1">
          Write your prompt according to the image you want to generate!
        </h3>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="author" className="font-semibold py-2">
            Author:
          </label>
          <input
            type="text"
            placeholder="Author name..."
            name="author"
            className="py-3 px-5 border-2 outline-none"
            onChange={handleChange}
          />

          <label htmlFor="prompt" className="font-semibold py-2">
            Prompt
          </label>
          <textarea
            type="text"
            placeholder="Enter your prompt here..."
            name="prompt"
            value={data.prompt}
            className="py-3 px-5 border-2 outline-none"
            onChange={handleChange}
          />
          <div className="flex space-x-3 mt-2">
            <button
              type="button"
              onClick={startListening}
              className="py-2 px-4 bg-green-500 text-white rounded-md flex items-center space-x-2"
              disabled={listening}
            >
              {listening ? <MicOff size={20} /> : <Mic size={20} />}
              <span>{listening ? "Listening..." : "Start Voice"}</span>
            </button>
          </div>
          <p className="font-medium text-sm my-2">
            * You can post the AI Generated Image to showcase in the community!
          </p>
          <button
            type="submit"
            className={`py-3 px-7 border-2 rounded-xl ${
              data.prompt !== ""
                ? "bg-blue-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={data.prompt === ""}
          >
            Generate Image
          </button>
        </form>
      </div>
    </div>
  );
}
