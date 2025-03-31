import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LuLoaderPinwheel } from "react-icons/lu";
import { MdFileDownload } from "react-icons/md";
import axios from "axios";
// const history = [
//   {
//     image:
//       "https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-cyber-gamer_117038-7605.jpg?w=2000",
//     author: "Arvind",
//     prompt: "Python for Beginners",
//   },
//   {
//     image:
//       "https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-cyber-gamer_117038-7605.jpg?w=2000",
//     author: "Anjali",
//     prompt: "Js for beginner",
//   },
//   {
//     image:
//       "https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-cyber-gamer_117038-7605.jpg?w=2000",
//     author: "Rohit",
//     prompt: "java for beginner",
//   },
//   {
//     image:
//       "https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-cyber-gamer_117038-7605.jpg?w=2000",
//     author: "Raj",
//     prompt: "Hello Raj",
//   },
// ];

export default function History() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
const [history, setHistory] = useState([]);
  const style = {
    fontFamily: "Times New Roman",
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const filteredImages =history?.length>0&& history?.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    )
  );

  const downloadImage = async (img) => {
    setLoading(true);
    try {
      const response = await fetch(img, { mode: "cors" });
      const blob = await response.blob();
  
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "image.png"; // Default name for downloaded image
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
    setLoading(false);
  };
  useEffect (() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/all-image');
        console.log(response.data.response)
        setHistory(response.data.response);
        } catch (error) {
          console.error("Error fetching history:", error);
          }
          }
          fetchHistory();
          }, []);
console.log(history)

  
  return (
    <>
      <div className="flex flex-col items-center justify-center my-10">
        <h1 className="font-medium text-3xl text-gray-950 py-2" style={style}>
          Explore popular posts in the Community!
        </h1>
        <h2
          className="font-extrabold text-3xl text-green-700 py-3"
          style={style}
        >
          Generated with AI By HLP
        </h2>
        <form className="flex items-center justify-start border-2 rounded-lg w-1/2 px-2 my-5">
          <button className="cursor-pointer">
            <FaSearch className="text-2xl font-bold" />
          </button>
          <input
            type="text"
            placeholder="search prompt..."
            className="p-3 border-0 outline-none text-lg "
            style={style}
            onChange={handleChange}
          />
        </form>
      </div>

    <div className=" flex items-center justify-center mx-auto my-10">
    <div className="flex flex-wrap items-center justify-start gap-5">
        {filteredImages.length>0&&filteredImages?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-xl shadow-gray-300 border-2 border-gray-950 rounded-lg"
            >
              <div className="w-70 h-72 bg-white shadow-xl shadow-gray-600">
                <img src={item.imageUrl} alt="" className=" w-full h-72" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold p-1">
                  Author :{item.author}
                </span>
                {loading ? (
                  <LuLoaderPinwheel className="w-10 h-10 cursor-pointer  m-2 flex items-center justify-center  rounded-full bg-white shadow-2xl shadow-amber-200 animate-spin " />
                ) : (
                  <span
                    className="w-10 h-10 cursor-pointer  m-2 flex items-center justify-center bg-blue-400 rounded-full bg-white shadow-2xl shadow-amber-200"
                    onClick={() => downloadImage(item.imageUrl)}
                  >
                    <MdFileDownload className="text-xl  font-bold text-gray-950" />{" "}
                  </span>
                )}
              </div>
              <div className="">
                <span>Prompt : {item.prompt} </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    </>
  );
}