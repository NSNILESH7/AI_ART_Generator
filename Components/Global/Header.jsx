import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Account,
  Generate,
  History,
  Home,
  Likes,
  HeaderLogo,
} from "../SVG/index";
import Setting from "./Setting";
import { CHECK_AUTH } from "../../Utils/index";

const Header = () => {
  const [auth, setAuth] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  const newList = [
    {
      menu: "Home",
      link: "/",
    },
    {
      menu: "Generate",
      link: "/aperture",
    },
    {
      menu: "History",
      link: "/history",
    },
    {
      menu: "Account",
      link: "/account",
    },
    {
      menu: "Like",
      link: "/likes",
    },
  ];
  const CALL_USER_DETAILS = async () => {
    try {
      const user = await CHECK_AUTH();
      console.log(user);
      setActiveUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(activeUser);
  

  useEffect(() => {
    const storedCookieValue = Cookies.get("token");
    if (storedCookieValue) {
      CALL_USER_DETAILS();
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <div
      className="fixed w-screen bottom-0 sm:top-0 z-50 flex flex-row justify-between items-center backdrop-blur bg-opacity-80 border-t sm:border-b border-opacity-50
  text-sm select-none bg-zinc-900 border-t-zinc-700 sm:border-zinc-700"
      style={{
        height: 56,
      }}
    >
      <a
        href="/"
        className="hidden sm:flex items-center cursor-pointer px-4
      pl-6 left-0 h-full w-32"
      >
        <HeaderLogo />
      </a>
      <div className="flex relative items-center h-full -mt-1 w-full sm:w-auto">
        <div
          className="absoilt rounded bg-zinc-700"
          style={{
            height: 32,
            top: 15,
            width: 0,
            opacity: 1,
            transform: "none",
          }}
        />
        {newList.map((item, index) => (
          <a
            href={item.link}
            key={index}
            className="flex  flex-row items-center  cursor-pointer  h-full px-2 py-1.5 pb-0 justify-center transition-all flex-1"
            style={{
              width: 80,
              zIndex: 2,
              opacity: "0.5",
            }}
          >
            <div className="relative sm:flex justify-center hidden:w-full">
              <div
                className="absoult w-full"
                style={{
                  borderBottom: "2.5px solid transparent",
                  bottom: -"17px",
                }}
              />
              <span>{item.menu}</span>
            </div>
            {item.menu === "Home" ? (
              <Home />
            ) : item.menu === "Generate" ? (
              <Generate />
            ) : item.menu === "History" ? (
              <History />
            ) : item.menu === "Likes" ? (
              <Likes />
            ) : (
              <Account />
            )}
          </a>
        ))}
      </div>
      {!auth ? (
        <div className=" hidden w-32 h-full sm:flex items-center justify-end mr-6">
          <button
            className="h-7 w-7 rounded-full text-xs md:text-sm bg-zinc-800 border border-zinc-700 
              drop-shadow flex items-center justify-center opacity-80  hover:opacity-100 "
            type="button"
            onClick={() =>
              openSetting ? setOpenSetting(false) : setOpenSetting(true)
            }
          >
            {activeUser ? activeUser.username.slice(0, 1).toUpperCase() : null}
          </button>
          {openSetting && <Setting activeUser={activeUser} />}
        </div>
      ) : (
        <div className="hidden  sm:flex  w-32 h-full items-center justify-end mr-6">
          <a
            href="/login"
            className=" flex items-center justify-center h-8  rounded-md t  border 
              drop-shadow  opacity-90  hover:opacity-100   hover:brightness-110 px-4 text-xs  md:text-sm bg-gradient-to-t from-indigo-800 
              via-indigo-800 to-indigo-800 drop-shadow font-medium whitespace-nowrap"
          >
            Get Started
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
