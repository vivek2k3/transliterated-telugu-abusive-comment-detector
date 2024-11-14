import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import axios from "axios";

function App() {
  const [comment, setComment] = useState("");
  const [result,setResult] = useState('');
  const fetch = async () => {
    try {
      const { data } = await axios.post("/api", { comment });
      if(data?.ok){
        if(data.res===1) setResult(`\"${comment}\" is Abusive`);
        else setResult(`\"${comment}\" is Non - Abusive`);
      }
    } catch (error) {
      console.log(error.message);
    }
    
  };
  return (
    <div className="home">
      <Header />
      <div className="h-screen flex">
        <div className="m-auto ">
          <div className="p-5 filter backdrop-blur-3xl text-white rounded-2xl flex justify-center align-middle flex-col">
            <p className="pb-2 font-extrabold mx-auto">
              Telugu Abusive Comment Detector
            </p>
            <img
              src={require("./static/document.jpeg")}
              alt=""
              className="m-auto w-64 rounded pb-5"
            />
            <div className="flex">
              <input
                type="text"
                className="mx-auto p-2 rounded-md text-black"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="filter backdrop-blur-xl bg-sky-800 px-2 rounded text-white"
                onClick={fetch}
              >
                Check
              </button>
            </div>
            <div className=" font-extrabold text-center w-64">
              {result}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
