import axios from "axios";
import React from "react";

import styles from "%/Home.module.css";
import DefaultHead from "@/components/DefaultHead";
import Loading from "@/components/Loading";
import serverUpload from "@/utils/upload";

import { Data } from "./api/types";

const Home = (): React.JSX.Element =>{
  const [loading, setLoading] = React.useState<boolean>(false); 
  const [data, setData] = React.useState<Data[]>([]);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const get = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/get");
    setData(data);
    setLoading(false);
  };

  const search = async (query: string = "") => {
    if(!query) return get();
    // setLoading(true);
    const { data } = await axios.get(`/api/search?q=${query}`);
    setData(data);
    // setLoading(false);
  };

  const upload = async () => {
    setLoading(true);
    try{
      const { name, thumb, view } = await serverUpload(fileRef);
      console.log(name, thumb, view);
      await get();
    }
    catch {
      alert("업로드에 실패하였습니다.");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    get();
  }, []);

  return (
    <>
      <DefaultHead />
      <main className={["main", styles.main].join(" ")}>
        <Loading show={loading} />
        <div className={styles.title}>PDF 파일 공유</div>
        <div className={styles.inputs}>
          <input 
            type="text" 
            className={styles.search} 
            placeholder="검색어를 입력하세요." 
            onChange={(e) => {
              search(e.target.value);
            }}
          />
          <input
            type="button"
            className={styles.upload}
            value="업로드"
            onClick={() => {
              fileRef.current?.click();
            }}
          />
          <input type="file" ref={fileRef} onChange={upload} className={styles.fileInput} />
        </div>
        <div className={styles.list}>
          {
            data.length ? data.map((item, i) => (
              <div key={i} className={styles.greed}>
                <div 
                  className={styles.item}
                  onClick={() => {
                    window.open(`/pdf/${item.view}`);
                  }}
                >
                  <img className={styles.img} src={item.thumb} alt={item.name} />
                  <div className={styles.name}>{item.name}</div>
                </div>
              </div>
            )) : <div>검색 결과 없음</div>
          }
        </div>
      </main>
    </>
  );
};


export default Home;