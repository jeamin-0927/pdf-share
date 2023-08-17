import Head from "next/head";
import React from "react";

import { P } from "./types";

const DefaultHead = ({ children }: P) => {
  return (
    <Head>
      <title>PDF 공유 서비스</title>
      <meta name="description" content="PDF 공유 서비스" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  );
};

export default DefaultHead;