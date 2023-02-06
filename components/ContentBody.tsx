import Image from "next/image";
import React from "react";

export interface IWord {
  _id: string;
  word: string;
  translation?: string;
  sentence?: string;
  meaning?: string;
  image?: string;
  audio?: string;
  level: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface IContentBodyProps {
  isShow: boolean;
  word: IWord;
}

const ContentBody: React.FC<IContentBodyProps> = ({ isShow, word }) => {
  return (
    <div className="max-w-[800px]">
      {isShow && (
        <>
          <div className="mb-4">
            <span className="font-light text-sm">Meaning:</span>
            <p>{word.meaning}</p>
          </div>
          <div className="mb-4">
            <span className="font-light text-sm">Sentence:</span>
            <p>{word.sentence}</p>
          </div>
          {word.image && (
            <div className="mb-4">
              <span className="font-light text-sm">Image:</span>
              <Image src={word.image} alt="img" width={200} height={100} />
            </div>
          )}
          <div className="mb-4 flex items-center gap-2">
            <span className="font-light text-sm">Level:</span>
            <p>{word.level}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentBody;
