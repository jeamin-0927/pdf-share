import React from "react";

import styles from "%/Home.module.css";
import DefaultHead from "@/components/DefaultHead";
import upload from "@/utils/upload";

const Home = () =>{
  const fileRef = React.useRef<HTMLInputElement>(null);

  const onChange = async () => {
    const { name, thumb, url } = await upload(fileRef);
    console.log(name, thumb, url);
    window.open(thumb);
  };

  return (
    <>
      <DefaultHead />
      <main className={styles.main}>
        <input type="file" ref={fileRef} onChange={onChange} />
      </main>
    </>
  );
};


export default Home;