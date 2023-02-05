import React, { useEffect, useState } from "react";
import ContentHeader from "./ContentHeader";
import ContentBody from "./ContentBody";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { shuffleArray } from "@/utils/shuffleArray";

const Content = () => {
  const [isShow, setIsShow] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [level, setLevel] = useState("All");
  const [wordsCount, setWordsCount] = useState("All");
  const [slicedWords, setSlicedWords] = useState([]);

  const getWords = async () => {
    let url = level === "All" ? "/api/words" : `api/words?level=${level}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log("axios err", error);
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["words"],
    queryFn: getWords,
  });

  useEffect(() => {
    refetch();
  }, [level]);

  useEffect(() => {
    if (data) {
      shuffleArray(data);
    }
  }, [data]);

  useEffect(() => {
    if (data !== undefined) {
      if (wordsCount === "All") {
        setSlicedWords(data);
      } else {
        setSlicedWords(data.slice(0, wordsCount));
      }
    }
  }, [wordsCount, data]);

  console.log(slicedWords);

  const changeWordIndex = (e: any) => {
    if (e.code === "ArrowRight") {
      setWordIndex(wordIndex === slicedWords.length - 1 ? 0 : wordIndex + 1);
    } else if (e.code === "ArrowLeft") {
      setWordIndex(wordIndex === 0 ? slicedWords.length - 1 : wordIndex - 1);
    }
  };

  useEffect(() => {
    setIsShow(false);
    window.addEventListener("keydown", changeWordIndex);

    return () => {
      window.removeEventListener("keydown", changeWordIndex);
    };
  }, [wordIndex]);

  if (isLoading && slicedWords.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full text-white">
      <div className="max-w-[1440px] w-full mx-auto py-4 px-2 flex flex-col items-center gap-4 relative">
        <div className="flex gap-10">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="bg-secondary text-white w-28 rounded-md px-2"
          >
            <option value="All">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <select
            value={wordsCount}
            onChange={(e) => setWordsCount(e.target.value)}
            className="bg-secondary text-white w-28 rounded-md px-2"
          >
            <option value="All">All</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="100">100</option>
          </select>
        </div>
        <div
          className="absolute top-1/2 right-10 text-4xl text-secondary"
          onClick={() =>
            slicedWords.length - 1 === wordIndex
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
              ? setWordIndex(slicedWords.length - 1)
              : setWordIndex(wordIndex - 1)
          }
        >
          <BsFillArrowLeftCircleFill />
        </div>
        <ContentHeader
          isShow={isShow}
          setIsShow={setIsShow}
          word={slicedWords[wordIndex]}
        />
        <ContentBody isShow={isShow} word={slicedWords[wordIndex]} />
      </div>
    </div>
  );
};

export default Content;
