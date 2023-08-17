import axios from "axios";
import React from "react";

import styles from "%/Home.module.css";
import DefaultHead from "@/components/DefaultHead";
import serverUpload from "@/utils/upload";

import { Data } from "./api/types";

const Home = () =>{
  const [data, setData] = React.useState<Data[]>([]);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const get = async () => {
    const { data } = await axios.get("/api/get");
    setData(data);
  };

  const search = async (query: string) => {
    const { data } = await axios.get(`/api/search?q=${query}`);
    setData(data);
  };

  const upload = async () => {
    const { name, thumb, url } = await serverUpload(fileRef);
    console.log(name, thumb, url);
    window.open(thumb);
  };

  return (
    <>
      <DefaultHead />
      <main className={["main", styles.main].join(" ")}>
        <input type="file" ref={fileRef} onChange={upload} />
      </main>
    </>
  );
};


export default Home;