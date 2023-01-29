import React, { useEffect, useState } from "react";
import ContentHeader from "./ContentHeader";
import ContentBody from "./ContentBody";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Content = () => {
  const [isShow, setIsShow] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const getWords = async () => {
    try {
      const response = await axios.get("/api/words");
      return response.data;
    } catch (error) {
      console.log("axios err", error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["words"],
    queryFn: getWords,
  });

  const changeWordIndex = (e: any) => {
    if (e.code === "ArrowRight") {
      setWordIndex(wordIndex === data.length - 1 ? 0 : wordIndex + 1);
    } else if (e.code === "ArrowLeft") {
      setWordIndex(wordIndex === 0 ? data.length - 1 : wordIndex - 1);
    }
  };

  useEffect(() => {
    setIsShow(false);
    window.addEventListener("keydown", changeWordIndex);

    return () => {
      window.removeEventListener("keydown", changeWordIndex);
    };
  }, [wordIndex]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full text-white">
      <div className="max-w-[1440px] w-full mx-auto py-4 px-2 flex flex-col items-center gap-4 relative">
        <div
          className="absolute top-1/2 right-10 text-4xl text-secondary"
          onClick={() =>
            data.length - 1 === wordIndex
              ? setWordIndex(0)
              : setWordIndex(wordIndex + 1)
          }
        >
          <BsFillArrowRightCircleFill />
        </div>
        <div
          className="absolute top-1/2 left-10 text-4xl text-secondary"
          onClick={() =>
            wordIndex === 0
              ? setWordIndex(data.length - 1)
              : setWordIndex(wordIndex - 1)
          }
        >
          <BsFillArrowLeftCircleFill />
        </div>
        <ContentHeader
          isShow={isShow}
          setIsShow={setIsShow}
          word={data[wordIndex]}
        />
        <ContentBody isShow={isShow} word={data[wordIndex]} />
      </div>
    </div>
  );
};

export default Content;
