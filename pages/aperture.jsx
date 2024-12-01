import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  FaInstagram,
  AiOutlineYoutube,
  BsCameraReelsFill,
} from "../Components/SVG/index";

import {
  Header,
  GetStarted,
  SingleImage,
  ApertImageCard,
  prompt,
  PromptInput,
  Subscription,
  AIProcessing,
  Button,
} from "../Components/index";

import {
  GET_AI_iMAGE,
  CHECK_AUTH,
  GET_USER_AI_iMAGE,
  IMAGE_GENERATOR_V2,
  IMAGE_GENERATOR_V3,
} from "../Utils";
import { response } from "express";

const aperture = () => {
  const [loader, setLoader] = useState(false);
  const [activeModel, setActiveModel] = useState(false);
  const [error, setError] = useState();
  const [category, setCategory] = useState("Youtube");
  const [singleID, setSingleID] = useState();

  const [activeUser, setActiveUser] = useState();
  const [allAIImage, setAllAIImage] = useState();

  const [searchItem, setSearchItem] = useState(search);
  const [openFilter, setOpenFilter] = useState(false);

  //v3
  const [v3_1024x1024, setV3_1024x1024] = useState();
  const [v3_1792x1024, setV3_1792x1024] = useState();
  const [v3_1024x1792, setV3_1024x1792] = useState();

  //v2
  const [v2_256x256, setV2_256x256] = useState();
  const [v2_512x512, setV2_512x512] = useState();
  const [v2_1024x1024, setV2_1024x1024] = useState();

  const [prompt_V3, setPrompt_V3] = useState({
    prompt: "",
    negativePrompt: "",
    size: "1024x1024",
    style: "vivid",
  });
  const [prompt_V2, setPrompt_V2] = useState({
    prompt: "",
    negativePrompt: "",
    size: "256x256",
    n: 3,
  });

  useEffect(() => {
    var value = localStorage.getItem("ACTIVE_MODEL");
    if (value) {
      setActiveModel(value);
    }
  }, [activeModel]);

  const CLICK_V3 = async (prompt_V3) => {
    try {
      setLoader(true);
      const res = await IMAGE_GENERATOR_V3(prompt_V3);
      if (res == "Prompt is missing") {
        setError(res);
        setLoader(false);
      } else if (res.status == 201) {
        setLoader(false);
        setSingleID(res.data.post._id);
      }
    } catch (error) {
      const errorMessage =
        error.message || "an unexpected error occured ( OpenAi)";
      setLoader(false);
      console.log(errorMessage);
    }
  };
  const CLICK_V2 = async (prompt_V2) => {
    try {
      setLoader(true);
      const res = await IMAGE_GENERATOR_V2(prompt_V2);
      if (res == "Prompt is missing") {
        setError(res);
        setLoader(false);
      } else if (res.status == 201) {
        setLoader(false);
        setSingleID(res.data.post._id);
      }
    } catch (error) {
      const errorMessage =
        error.message || "an unexpected error occured ( OpenAi)";
      setLoader(false);
      console.log(errorMessage);
    }
  };

  const changeCategory = (category) => {
    const model = localStorage.getItem("ACTIVE_MODEL");

    if (model === "AI Image Art Dall-e-v2") {
      if (category === "Reel") {
        setAllAIImage(v2_256x256);

        setCategory("Reel");
      } else if (model === "Instagram") {
        setAllAIImage(v2_512x512);

        setCategory("Instagram");
      } else if (model === "Youtube") {
        setAllAIImage(v2_1024x1024);
        setCategory("Youtube");
      }
    } else {
      if (category === "Reel") {
        setAllAIImage(v3_1024x1792);

        setCategory("Reel");
      } else if (category === "Instagram") {
        setAllAIImage(v3_1024x1024);

        setCategory("Instagram");
      } else if (category === "Youtube") {
        setAllAIImage(v3_1792x1024);
        setCategory("Youtube");
      }
    }
  };

  const CALLING_ALL_POST = async () => {
    try {
      const res = await GET_AI_iMAGE();
      console.log(res);

      const v2_256x256Temp = [];
      const v2_512x512Temp = [];
      const v2_1024x1024Temp = [];

      const v3_1024x1792Temp = [];
      const v3_1024x1024Temp = [];
      const v3_1792x1024Temp = [];

      res.forEach((item) => {
        if (item.model === "AI Image Art Dall-e-v2") {
          if (item.size === "256x256") {
            v2_256x256Temp.push(item);
          } else if (item.size === "512x512") {
            v2_512x512Temp.push(item);
          } else if (item.size === "1024x1024") {
            v2_1024x1024Temp.push(item);
          }
        } else if (item.model === "AI Image Art Dall-e-v3") {
          if (item.size === "1024x1792") {
            v3_1024x1792Temp.push(item);
          } else if (item.size === "1024x1024") {
            v3_1024x1024Temp.push(item);
          } else if (item.size === "1792x1024") {
            v3_1792x1024Temp.push(item);
          }
        }
      });

      setV2_256x256(v2_256x256Temp);
      setV2_512x512(v2_512x512Temp);
      setV2_1024x1024(v2_1024x1024Temp);

      setV3_1024x1792(v3_1024x1792Temp);
      setV3_1024x1024(v3_1024x1024Temp);
      setV3_1792x1024(v3_1792x1024Temp);

      const model = localStorage.getItem("ACTIVE_MODEL");
      if (model === "AI Image Art Dall-e-v2") {
        setAllAIImage(v2_256x256Temp);
        setAllPostCopy(v2_256x256Temp);
      } else {
        setAllAIImage(v3_1024x1792Temp);
        setAllPostCopy(v3_1024x1792Temp);
      }

      const storeCookies = Cookies.get("token");

      if (storeCookies) {
        const user = await CHECK_AUTH();
        setActiveUser(user);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CALLING_ALL_POST();
  }, []);

  const arrayRender = [...(allAIImage?.reverse() || [])];

  return (
    <>
      <Header />
      <div className="mb-[56px] sm:mb-0 sm:mt-[56px] ">
        <GetStarted activeUser={activeUser} />
        <div>
          <div className="w-full overflow-x-hidden ">
            <div className="flex items-center w-full  mt-8 sm:mt-4 md:mt-10 ">
              <div className="px-2 md:px-10 lg:px-16 flex items-center flex-col max-w-[1300px] w-full">
                <div className="w-full flex flex-col-reverse md:flex-row ">
                  <Prompt
                    promptv3={prompt_V3}
                    setPromptv3={setPrompt_V3}
                    promptv2={prompt_V2}
                    setPromptv2={setPrompt_V2}
                    loader={loader}
                    error={error}
                    activeUser={activeUser}
                    generatFunction={() =>
                      activeModel == "AI Image Art Dall-e-v3 "
                        ? CLICK_V3(prompt_V3)
                        : CLICK_V3(prompt_V2)
                    }
                  />
                  <PromptInput
                    promptv3={prompt_V3}
                    setPromptv3={setPrompt_V3}
                    promptv2={prompt_V2}
                    setPromptv2={setPrompt_V2}
                    activeModel={activeUser}
                    setActiveModel={setActiveModel}
                    activeUser={activeUser}
                  />
                </div>
                <div
                  className="items-center w-full max-w [800px] mt-8 px-4 pl-5 md:px:5
                "
                  style={{
                    minHeight: "1px",
                    position: "relative",
                  }}
                >
                  <div></div>
                </div>
                <Subscription activeUser={activeUser} />
              </div>

              {/* BODY */}

              <div className="flex space-x-2 px-2">
                <Button
                  icon={<BsCameraReelsFill />}
                  name={"Reel"}
                  handleClick={() => changeCategory("Reel")}
                  category={category}
                />
                <Button
                  icon={<AiOutlineYoutube />}
                  name={"Youtube"}
                  handleClick={() => changeCategory("Youtube")}
                  category={category}
                />
                <Button
                  icon={<FaInstagram />}
                  name={"Instagram"}
                  handleClick={() => changeCategory("Instagram")}
                  category={category}
                />
              </div>

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      {singleID && (
        <SingleImage singleID={singleID} setSingleID={setSingleID} />
      )}
      {loader && <AIProcessing />}{/* </div> */}
    </>
  );
};

export default aperture;
