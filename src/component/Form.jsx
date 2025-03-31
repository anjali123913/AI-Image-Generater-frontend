import { useEffect, useState } from "react";
import axios from "axios";
export default function Form({setImageUrl}) {
  const [loaded, setLoaded] = useState(false);

  const [data, setData] = useState({
    author: "",
    prompt: "",
  });
  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    generateImage();
    setLoaded(true);
  };
  const generateImage = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/generate-image",
        data
      );
      console.log(res.data);
      setImageUrl(res.data.image.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className=" bg-white p-10 shadow-xl shadow-gray-600 md:w-[500px] w-full">
        <h1 className="font-semibold text-2xl py-1">
          Generate Image with prompt
        </h1>
        <h3 className="text-lg py-1">
          {" "}
          Write your prompt according to the image you want to generate!
        </h3>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="author" className="font-semibold py-2">
            Author :{" "}
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
            className="py-3 px-5 border-2 outline-none"
            onChange={handleChange}
          />
          <p className="font-medium text-sm my-2">
            * You can post the AI Generated Image to showcase in the community!
          </p>
          <div className="flex items-center justify-between p-2 mt-3 mx-auto">
            <button
              type="submit"
              className={
                data.prompt !== ""
                  ? "py-3   px-7 cursor-pointer bg-blue-600 border-2 border-gray-200  rounded-xl "
                  : "py-3 px-7 border-2 border-gray-200  rounded-xl  disabled:bg-blue-200 disabled:cursor-not-allowed"
              }
              disabled={data.prompt === ""}
            >
              Generate Image
            </button>
           
          </div>
        </form>
      </div>
         
    </div>
  );
}
