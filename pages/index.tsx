import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
const Home: NextPage = () => {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <main>
      <div id="map">
        <MapWithNoSSR />
      </div>
    </main>
  );
};

export default Home;
