import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

import styles from "%/Home.module.css";
import DefaultHead from "@/components/DefaultHead";
import Loading from "@/components/Loading";

import { Data } from "../api/pdf/[view]";

const PdfView = () => {
  const router = useRouter();
  const view = router.query.view as string;

  const [data, setData] = React.useState<Data>({
    name: "",
    thumb: "",
    url: "",
    view: ""
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const get = async () => {
    if(!view) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/pdf/${view}`);
      setData(data);
    }
    catch {
      alert("파일을 불러오는데 실패하였습니다.");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    get();
  }, [view]);

  return (
    <>
      <DefaultHead />
      <main className={["main", styles.main].join(" ")}>
        <Loading show={loading} />
        <div className={styles.pdfTitle}>{data.name}</div>
        <img className={styles.pdfImage} src={data.thumb} alt={data.name} />
        <a className={styles.download} href={data.url} target="_blank" rel="noreferrer">다운로드 하기</a>
      </main>
    </>
  );
};

export default PdfView;