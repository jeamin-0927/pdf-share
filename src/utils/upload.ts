import axios from "axios";
import React from "react";

const readFileAsync = (file: File) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const upload = async (fileRef: React.MutableRefObject<HTMLInputElement>) => {
  const file = fileRef.current?.files?.[0];
  if (!file) return;
  const reader = await readFileAsync(file);
  const { data } = await axios({
    method: "POST",
    url: "/api/upload",
    data: {
      file: reader,
      fileName: file.name,
    },
  });
  return data;
};

export default upload;