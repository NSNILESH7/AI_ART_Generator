import React, { useState, useEffect } from "react";
import cookie from "js-cookie";

import Setting from "./Setting";

const GetStarted = ({ activeUser }) => {
  const [auth, setAuth] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  useEffect(() => {
    const storedCookinValue = cookie.get("token");
    if (storedCookinValue) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <>
      {auth ? (
        <div
          className="sm:g=hidden absoulte w-full  flex items-center
      justify-end top-2 right-2"
        >
          <button
            onClick={() =>
              openSetting ? setOpenSetting(false) : setOpenSetting(true)
            }
            className="h-7 w-7 rounded-full text-xs md:text-sm bg-zinc-700
           flex items-center justify-center drop-shadow opacity-80
          hover:opacity-100
           "
          >
            G
          </button>
        </div>
      ) : (
        <div
          className="sm:g=hidden absoulte w-full  flex items-center
      justify-end top-2 right-2"
        >
          <a
            href="/login"
            className="flex items-center justify-center h-8 rounded-md opacity-90
           hover:brightness-110 px-4 text-xs md:text-sm bg-graident-to-t from-indigo-800 via-indigo-800
           to-indigo-600 drop-shadow font-medium  whitespace-nowrap"
          >
            Get Started
          </a>
        </div>
      )}
    </>
  );
};

export default GetStarted;
