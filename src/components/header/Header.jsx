import React, { useState } from "react";

export default function Header() {
  const [isToggled, setIsToggled] = useState(false);
  const [dark, setDark] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Serif");

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
      setSelectedFont(fontName);
      setShow(false);
    };
  };

  return (
    <div className="relative w-full max-w-[328px] md:max-w-[736px] mx-auto flex items-center justify-between">
      <img src="./assets/iconoir_book.png" alt="" className="w-8 h-8" />

      <div className="flex items-center relative">
        <button
          onClick={handleShow}
          className="flex max-md:ml-[100px] md:ml-[550px] text-base md:text-2xl dark:text-white items-center gap-2"
        >
          {selectedFont}
          <img src="./assets/Path 3.png" className="w-3 h-2 md:w-4 md:h-3" />
        </button>

        {show && (
          <div className="absolute w-[150px] md:w-[185px] z-30 top-[40px] right-0 md:left-[450px] flex flex-col rounded-lg mt-[10px] bg-white dark:bg-[#1F1F1F] shadow-lg dark:hover:shadow-[-6px_-8px_68px_3px_rgba(173,0,204,0.68)]">
            <button
              onClick={changeFont("Sans Serif", "sans-serif")}
              className="p-2 text-left hover:bg-gray-100 dark:hover:text-[#A445ED] dark:hover:bg-[#2D2D2D] dark:text-white"
            >
              Sans Serif
            </button>
            <button
              onClick={changeFont("Serif", "serif")}
              className="p-2 text-left hover:bg-gray-100 dark:hover:text-[#A445ED] dark:hover:bg-[#2D2D2D] dark:text-white"
            >
              Serif
            </button>
            <button
              onClick={changeFont("Mono", "monospace")}
              className="p-2 text-left hover:bg-gray-100 dark:hover:text-[#A445ED] dark:hover:bg-[#2D2D2D] dark:text-white"
            >
              Mono
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <div className="w-[1px] h-[32px] bg-slate-400 mx-4"></div>
        <div
          className="w-10 h-5 bg-gray-500 rounded-full cursor-pointer relative dark:bg-[#A445ED]"
          onClick={handleToggle}
        >
          <div
            className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
              isToggled ? "left-6" : "left-1"
            }`}
          ></div>
        </div>
        <img
          className="ml-4"
          src={
            dark
              ? "./assets/iconoir_half-moon (1).png"
              : "./assets/iconoir_half-moon.png"
          }
          alt=""
        />
      </div>
    </div>
  );
}
