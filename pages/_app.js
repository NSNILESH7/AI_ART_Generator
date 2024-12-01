import "../styles/globals.css";
import Head from "next/head";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";

import { Auth } from "../Components/index";

export default function App({ Component, pageProps }) {

const [auth, setAuth] = useState(true);

  useEffect(() => {
  const storedCookiedValue = Cookie.get("token");
  if (storedCookiedValue) {
    setAuth(false);
  } else {
    setAuth(true);
  }},[])

  return (
    <>
      <Head>
        <title>AI IMAGE ART</title>
        <meta name="description" content="AI Image Art Generator powered by @nilesh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/assets/ailogo.png" />
      </Head>
      {
        auth && <Auth />
      }
   <Component {...pageProps} />
    </>
  );
}
