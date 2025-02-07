import React, { useState } from "react";
import axios from "axios";
import Header from "./components/header/Header";

function App() {
  const [word, setWord] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});

  const fetchData = async (searchWord) => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
      );
      console.log(response);

      setData(response.data);
    } catch (e) {
      setData([]);
      setError(e.response.data);
    }
  };

  const handleSearch = () => {
    if (word.trim()) {
      setIsEmpty(false); // Reset the error state
      fetchData(word);
    } else {
      setIsEmpty(true); // Set the error state if the input is empty
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const playSound = () => {
    const audioUrl = data[0].phonetics[0].audio;
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="min-h-[100vh] pt-12 dark:bg-black">
      <div>
        <Header />
        <div className="relative w-full max-w-[736px] mx-auto">
          {/* Input Wrapper */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for any word"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
                setIsEmpty(false); // Reset the error state when typing
              }}
              onKeyPress={handleKeyPress}
              className={`  max-md:w-[327px] max-md:mx-auto max-md:flex    w-full mt-[10px] pl-4 pr-10 py-2 dark:bg-[#1F1F1F] dark:text-[white] border bg-[#F4F4F4] rounded-lg transition-all duration-200
                ${
                  isEmpty ? "border-red-500" : "focus:border-[#A445ED]"
                } focus:outline-none`}
            />
            <img
              src="./assets/search.png"
              alt="search"
              onClick={handleSearch}
              className="max-md:mr-[200px] max-md:mt-[0px]   absolute  mt-[5px] right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
            />
          </div>
          {isEmpty && (
            <p className="max-md:ml-[200px]  text-red-500 text-sm mt-1">
              Whoops, can’t be empty...
            </p>
          )}
        </div>
      </div>

      {data.length ? (
        <div className="max-md:w-[327px] w-[736px] mt-[20px] justify-center mx-auto">
          <div
            className="max-md:w-[48px]  max-md:h-[48px] max-md:ml-[280px]  w-[75px] h-[75px] absolute ml-[655px]  hover:bg-[#A445ED] cursor-pointer rounded-full bg-[#a445ed66] flex items-center justify-center"
            onClick={playSound}
          >
            <img
              className="transition-all max-md:w-[13px] max-md:h-[13px] duration-200 cursor-pointer hover:brightness-0 hover:contrast-200"
              src="./assets/Path 2.png"
              alt="play sound"
            />
          </div>

          <div>
            <h2 className="max-md:text-[32px] font-bold text-7xl mt-[40px] dark:text-white">
              {data[0].word}
            </h2>
            <h2 className="text-[#A445ED] mt-[10px] text-2xl">
              {data[0].phonetics[0].text}
            </h2>
            {data[0].meanings.map((el, index) => (
              <div key={index}>
                <h2 className="text-2xl mt-[15px] dark:text-white">
                  {el.partOfSpeech}
                </h2>
                <h1 className="text-[#838383] mt-[36px]">Meaning</h1>
                {el.definitions.map((item, defIndex) => (
                  <ul
                    key={defIndex}
                    className="max-md:pl-0 list-disc pl-10 dark:text-white"
                  >
                    <li className=" max-md:text-[15px] max-md:mt-[13px] text-[text-lg] dark:marker:text-[#8F19E8]">
                      {item.definition}
                    </li>
                  </ul>
                ))}
              </div>
            ))}
            <h2 className="text-[#A445ED] font-bold mt-[10px]">
              Synonyms:{" "}
              {data
                .flatMap((entry) =>
                  entry.meanings.flatMap((meaning) => meaning.synonyms)
                )
                .join(", ")}
            </h2>
            <h2 className="text-[#757575] font-bold mt-[20px] ">
              Source:{" "}
              {data[0].sourceUrls.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2D2D2D] underline ml-2 dark:text-[white]"
                >
                  {url}
                </a>
              ))}
            </h2>
          </div>
        </div>
      ) : (
        <div className="max-md:w-[327px]   w-[736px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <img className="mx-auto" src="./assets/😕.png" alt="error" />
          <h2 className="mt-[40px] font-bold dark:text-white ">
            {error.title}
          </h2>
          <h2 className="mt-[18px] text-[#757575]">
            {error.message} {error.resolution}
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
