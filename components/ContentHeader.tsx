import React, { useEffect, useState } from "react";
import { BsCheckLg, BsFillVolumeUpFill } from "react-icons/bs";

export interface IWord {
  _id: string;
  word: string;
  translation: string;
  sentence: string;
  meaning: string;
  image: string;
  audio: string;
  level: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface IContentHeaderProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  word: IWord;
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
  isShow,
  setIsShow,
  word,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof Audio != "undefined") {
      const newAudio = new Audio(word?.audio);
      setAudio(newAudio);
    }
  }, [word]);

  return (
    <div className="mt-20 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={() => audio?.play()}
          className="p-1 rounded-full text-white bg-secondary border border-solid border-secondary hover:bg-white hover:text-secondary transition-colors duration-300"
        >
          <BsFillVolumeUpFill />
        </button>
        <p className="font-medium text-2xl ">{word?.word}</p>
        {isShow && (
          <>
            <span>{"=>"}</span>
            <p> {word.translation}</p>
          </>
        )}
      </div>
      <button
        onClick={() => setIsShow(!isShow)}
        className="bg-secondary px-4 py-2 rounded-lg hover:bg-white hover:text-secondary transition-colors duration-300"
      >
        Show
      </button>
    </div>
  );
};

export default ContentHeader;
