import React from "react";
import { useState, useEffect } from "react";
import { Tick, ArrowDown } from "../SVG/index";

const Notic = () => {
  const [openNotic, setOpenNotic] = useState(false);
  const [activeModel, setActiveModel] = useState("AI Image Art Dall-e-v2");

  const AI_MODEL = ["AI Image Art Dall-e-v2", "AI Image Art Dall-e-v3"];

  const [aiModel, setAiModel] = useState("AI Image Art Dall-e-v2");
  const changeModel = (model) => {
    setAiModel(model);
    localStorage.setItem("ACTIVE_MODEL", model);
    setActiveModel(model);
    setOpenNotic(false);
    window.location.reload();
  };

  useEffect(() => {
    var value = localStorage.getItem("ACTIVE_MODEL");
    if (value) {
      setAiModel(value);
      setActiveModel(value);
    }
  }, []);
  return (
    <div
      className="notic  flex w-full max-w-[600px] px-4 pl-5
  md:px-5 md:ml-[48px]"
      style={{
        position: "relative",
      }}
    >
      {openNotic && (
        <div
          className="notic-modal"
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "238.492px",
            top: "0",
            bottom: "0px",
            height: "441px",
            margin: "10px 0px",
            minHeight: "72px",
            maxHeight: "752px",
            zIndex: "auto",
            position: "absolute",
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              maxHeight: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "none",
              pointerEvents: "auto",
            }}
          >
            <div
              className="bg-zinc-800 p-1 drop-shadow-md  border border-zinc-700 rounded-md"
              style={{
                position: "relative",
                flex: "1 1 0%",
                overflow: "auto",
              }}
            >
              <div className="select-none">
                {AI_MODEL.map((model, index) => (
                  <div
                    key={index}
                    onClick={() => changeModel(model)}
                    className="flex space-x-2 items-center px-4 pl-8 py-2
                      cursor-pointer hover:bg-zinc-700 rounded text-xs relative
                      focus:outline-none"
                  >
                    <span>{model}</span>
                    {aiModel === model && (
                      <span className="absolute  w-6 left-0 top-0">
                        <Tick />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col iteams-center">
        <div
          className="w-full px-3 pt-3   flex
          space-1 jestify-center iteams-center pr-12"
        >
          <button
            className="flex cursor-pointer select-none hover:zinc-900
          hover:bg-opacity-50 pl-3 pr-3 pr-2,5 py-2iteams-center
          justify-center space-x-1.5 rounded focus:outline-none text-xs
          text-zince-200"
            type="button"
            onClick={() =>
              openNotic ? setOpenNotic(false) : setOpenNotic(true)
            }
          >
            <span
              style={{
                pointerEvents: "none",
              }}
            >
              {activeModel}
            </span>
            <span aria-hidden="true">
              <ArrowDown />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notic;