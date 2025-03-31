import Form from "./Form";
import image from "../assets/react.svg";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState();

  return (
    <div className="bg-gray-400 py-5 items-center justify-evenly mx-auto">
      <div className="lg:flex flex-1  gap-20 my-20 md:ms-28 ms-auto">
        <Form setImageUrl={setImageUrl}/>
        <div className="md:w-[450px] w-full h-[450px] flex items-center justify-center mx-auto lg:mt-0 mt-20 bg-white shadow-xl shadow-gray-600">
          <img src={imageUrl} alt="generated image" className="object-cover md:w-[450px] w-full h-[450px] " />
        </div>
      </div>
    </div>
  );
}