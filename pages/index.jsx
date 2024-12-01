import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import {
  HomeLogo,
  Search,
  Image,
  Filter,
  FaHeart,
  FaInstagram,
  AiOutlineYoutube,
  BsCameraReelsFill,
  FaRegHeart,
  Magic,
} from "../Components/SVG/index";

import {
  Header,
  GetStarted,
  ImageCard,
  SingleImage,
  ApertImageCard,
  Notic,
  Button,
  PaymentProssing,
} from "../Components/index";

import { GET_AI_iMAGE, CHECK_AUTH } from "../Utils";

const index = () => {
  const { query } = useRouter();
  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState("Reel");
  const [singleID, setSingleID] = useState();
  const [buy, setBuy] = useState();

  const [activeUser, setActiveUser] = useState();
  const [allAIImage, setAllAIImage] = useState();
  const [allPostCopy, setAllPostCopy] = useState([]);

  const [search, setSearch] = useState("");
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

  useEffect(() => {
    if (query.CREDIT_PLAN) {
      setBuy(query.CREDIT_PLAN);
    }
  }, [query.CREDIT_PLAN]);

  const changeCategory = (category) => {
    const model = localStorage.getItem("ACTIVE_MODEL");

    if (model === "AI Image Art Dall-e-v2") {
      if (category === "Reel") {
        setAllAIImage(v2_256x256);
        setAllPostCopy(v2_256x256);
        setCategory("Reel");
      } else if (model === "Instagram") {
        setAllAIImage(v2_512x512);
        setAllPostCopy(v2_512x512);
        setCategory("Instagram");
      } else if (model === "Youtube") {
        setAllAIImage(v2_1024x1024);
        setAllPostCopy(v2_1024x1024);
        setCategory("Youtube");
      }
    } else {
      if (category === "Reel") {
        setAllAIImage(v3_1024x1792);
        setAllPostCopy(v3_1024x1792);
        setCategory("Reel");
      } else if (category === "Instagram") {
        setAllAIImage(v3_1024x1024);
        setAllPostCopy(v3_1024x1024);
        setCategory("Instagram");
      } else if (category === "Youtube") {
        setAllAIImage(v3_1792x1024);
        setAllPostCopy(v3_1792x1024);
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

  const HANDLE_SEARCH = (value) => {
    const filterPosts = allAIImage.filter((prompt) =>
      prompt.toLowerCase().includes(value.toLowerCase())
    );
    if (filterPosts.length === 0) {
      setAllAIImage(allPostCopy);
    } else {
      setAllAIImage(filterPosts);
    }
  };

  const onClearSearch = () => {
    if (allAIImage?.length && allPostCopy?.length) {
      setAllAIImage(allPostCopy);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      HANDLE_SEARCH(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  const arrayRender = [...(allAIImage?.reverse() || [])];

  return (
    <>
      <Header />
      <div className="mb-[56px] sm:mb-0 sm:mt-[56px] ">
        <div className="flex flex-col">
          <GetStarted activeUser={activeUser} />

          <div className="w-full overflow-x-hiden flex flex-col items-center py-4 mt=16">
            <a href="/">
              {" "}
              <HomeLogo />
            </a>
            <a href="/aperture" className="cursor-pointer">
              <p
                className="mt-2 text-xs text-indigo-300 active:scale-95 text-center font-medium shadow-sm hover:shadow-md bg-indigo-300 bg-opacity-5 hover:bg-opacity-5 hover:bg-opacity-10 border border-indigo-300 border-opacity-10
               hocer:border=opacity=20 transition-all rounded-md px-2 py-2"
              >
                AI IMAGE 10.5 is HERE!
              </p>
            </a>

            <div className="flex items-center w-full max-w-[600px] md:ml-[48px] mt-8 px-4 pl-5 md:px-5 ">
              <div className="w-full">
                <div
                  className="w-full flex items-center relative"
                  onClick={() => changeCategory("Filter")}
                >
                  <Search />
                  <input
                    className="bg-zinc-700 flex-1 pl-12 pr-12 rounded-full text-sm px-4
                  py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-700 "
                    placeholder="Search for an image"
                    onChange={(e) => setSearchItem(e.target.value)}
                    value={searchItem}
                  />

                  <button
                    type="button"
                    className="text-base absolute right-2 hover:bg-zinc-800 h-8 w-8
                  flex items-center justify-ceter rounded-full"
                  >
                    <Image />
                  </button>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        openFilter ? setOpenFilter(false) : setOpenFilter(true)
                      }
                      className="ml-2 h-10 w-10 rounder-full cursor-pointer flex items-center justify-center bg-transparent
                      hover:bg-zinc-900"
                    >
                      <Filter />
                    </button>
                  </div>
                </div>
                <div
                  className="w-full flex max-w-[600px] md:ml-[48px] px-4 pl-5 md:px-5 "
                  style={{ position: "relative" }}
                />
                  {openFilter && <Notic />}

                  <div className="mb-8 flex flex-col items-center">
                    <div className="flex space-x-2 ">
                      <button
                        className="w-32 sm:w-36 flex items-center  text-xs justify-center  text-center h-9  rounded-full
                      hover:brightness-110  shadow-sm mt-4 bg-gradient-to-t from-indigo-900 via-indigo-800 to-indigo-900"
                      >
                        Search
                      </button>
                      <a href="/aperture">
                        <button
                          className="w-32 sm:w-36 flex items-center text-xs justify-center  text-center h-9  rounded-full
                      hover:brightness-110  shadow-sm mt-4 border border-gray-700 hover:bg-zinc-700"
                        >
                          Generate
                        </button>
                      </a>
                    </div>
                  </div>

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
                  <div className="mt-2">&nbsp;</div>
                  <div className="mt-3 relative px-2 md:px-7 w-full">
                    <div
                      className="active:outline-none focus:outline-none overflow-hidden
                    new-css-style-box"
                      role="grid"
                      tabIndex={0}
                      style={{
                        position: "relative",
                        display: "flex",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px, 1fr))",
                        listStyle: "none",
                        margin: "0",
                        gap: ". 1rem",
                      }}
                    >
                      <>
                        {arrayRender.map((item, index) => (
                          <ImageCard
                            index={index}
                            item={item}
                            setSingleID={setSingleID}
                            activeUser={activeUser}
                          />
                        ))}
                      </>
                    </div>
                  {/* </div> */}
               </div>
              </div>
            </div>
          </div>
        </div>
        {singleID && <SingleImage 
          singleID={singleID}
          setSingleID={setSingleID}
        />};
 
        {buy && (
          <PaymentProssing buying={buy} setBuying={setBuy} />
        )};
      </div>
    </>
  );
};

export default index;
