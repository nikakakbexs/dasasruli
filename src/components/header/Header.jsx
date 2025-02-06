import React, { useState } from "react";

export default function Header() {
  const [isToggled, setIsToggled] = useState(false);
  const [dark, setDark] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Serif"); // Track selected font

  const handleShow = () => {
    setShow(!show);
  };

  const handleToggle = () => {
    setDark(!dark);
    setIsToggled(!isToggled);
    document.documentElement.classList.toggle("dark");
  };

  const changeFont = (fontName, fontFamily) => {
    return () => {
      document.body.style.fontFamily = fontFamily;
      setSelectedFont(fontName); // Update button text
      setShow(false);
    };
  };

  return (
    <div className="relative w-full max-w-[736px] mx-auto flex items-center">
      <img src="./assets/iconoir_book.png" alt="" width={32} height={36} />
      <div className="flex items-center relative">
        <button
          onClick={handleShow}
          className="flex ml-[450px] text-2xl dark:text-white"
        >
          {selectedFont} {/* Updated button text */}
        </button>
        {show && (
          <div className="absolute w-[185px] z-30 top-[40px] left-[450px] flex flex-col rounded-lg mt-[10px] bg-white dark:bg-[#1F1F1F] shadow-lg">
            <button
              onClick={changeFont("Sans Serif", "sans-serif")}
              className="p-2 text-left hover:bg-gray-100 dark:hover:bg-[#2D2D2D] dark:text-white"
            >
              Sans Serif
            </button>
            <button
              onClick={changeFont("Serif", "serif")}
              className="p-2 text-left hover:bg-gray-100 dark:hover:bg-[#2D2D2D] dark:text-white"
            >
              Serif
            </button>
            <button
              onClick={changeFont("Mono", "monospace")}
              className="p-2 text-left hover:bg-gray-100 dark:hover:bg-[#2D2D2D] dark:text-white"
            >
              Mono
            </button>
          </div>
        )}
        <img className="ml-[18px] flex mt-[6px]" src="./assets/Path 3.png" />
      </div>
      <div className="w-[1px] ml-[25px] h-[32px] bg-slate-400"></div>
      <div
        className="w-10 h-5 ml-[46px] bg-gray-500 rounded-full cursor-pointer relative dark:bg-[#A445ED]"
        onClick={handleToggle}
      >
        <div
          className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
            isToggled ? "left-6" : "left-1"
          }`}
        ></div>
      </div>
      <img
        className="ml-[20px]"
        src={
          dark
            ? "./assets/iconoir_half-moon (1).png"
            : "./assets/iconoir_half-moon.png"
        }
        alt=""
      />
    </div>
  );
}
