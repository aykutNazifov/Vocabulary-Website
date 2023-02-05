import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

enum ELevel {
  "A" = "A",
  "B" = "B",
  "C" = "C",
}

interface IAddModalProps {
  setShowModal: (bool: boolean) => void;
  isEdit?: boolean;
  values?: IDataState | any;
}

interface IDataState {
  word: string;
  translation: string;
  sentence: string;
  meaning: string;
  image: string;
  audio: string;
  level: ELevel;
}

const AddModal: React.FC<IAddModalProps> = ({
  setShowModal,
  isEdit,
  values,
}) => {
  const [data, setData] = useState<IDataState>({
    word: "",
    translation: "",
    sentence: "",
    meaning: "",
    image: "",
    audio: "",
    level: ELevel.A,
  });

  console.log("data", data);

  const queryClient = useQueryClient();

  const addWord = async (newWord: any) => {
    if (newWord.word) {
      try {
        await axios.post("/api/words", newWord);
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateWord = async (newWord: any) => {
    if (newWord.word) {
      try {
        await axios.put(`/api/words/${newWord._id}`, newWord);
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const mutation = useMutation({
    mutationFn: addWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  });

  const mutation2 = useMutation({
    mutationFn: updateWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  });

  useEffect(() => {
    if (isEdit) {
      setData(values);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      mutation2.mutate({ ...data });
    } else {
      mutation.mutate({ ...data });
    }
  };
  return (
    <div className="w-full h-screen absolute top-0 right-0 bg-[rgba(255,255,255,0.3)] flex justify-center items-center">
      <form
        className="w-[700px] px-10 py-4 bg-primary rounded-lg  relative"
        onSubmit={onSubmit}
      >
        <button
          onClick={() => setShowModal(false)}
          type="button"
          className="absolute top-2 right-2 text-2xl"
        >
          <AiFillCloseCircle />
        </button>
        <div className="flex flex-col gap-1 mb-5">
          <label htmlFor="word">Word</label>
          <input
            onChange={onChange}
            value={data.word}
            placeholder="Word"
            id="word"
            className="w-full h-10 bg-transparent border border-solid border-white px-1"
          />
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label htmlFor="translation">Translation</label>
          <input
            onChange={onChange}
            value={data.translation}
            placeholder="Translation"
            id="translation"
            className="w-full h-10 bg-transparent border border-solid border-white px-1"
          />
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label htmlFor="sentence">Sentence</label>
          <input
            onChange={onChange}
            value={data.sentence}
            placeholder="Sentence"
            id="sentence"
            className="w-full h-10 bg-transparent border border-solid border-white px-1"
          />
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label htmlFor="meaning">Meaning</label>
          <input
            onChange={onChange}
            value={data.meaning}
            placeholder="Meaning"
            id="meaning"
            className="w-full h-10 bg-transparent border border-solid border-white px-1"
          />
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label htmlFor="image">Image</label>
          <input
            onChange={onChange}
            value={data.image}
            placeholder="Image"
            id="image"
            className="w-full h-10 bg-transparent border border-solid border-white px-1"
          />
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label htmlFor="audio">Audio</label>
          <input
            onChange={onChange}
            value={data.audio}
            placeholder="Audio"
            id="audio"
            className="w-full h-10 bg-transparent border border-solid border-white px-1"
          />
        </div>
        <div className="flex flex-col gap-1 mb-5">
          <label htmlFor="level">Level</label>
          <select
            onChange={onChange}
            id="level"
            value={data.level}
            className="w-full h-10 bg-transparent border border-solid border-white px-1"
          >
            <option className="bg-secondary text-white" value="A">
              A
            </option>
            <option className="bg-secondary text-white" value="B">
              B
            </option>
            <option className="bg-secondary text-white" value="C">
              C
            </option>
          </select>
        </div>
        <button className="bg-white text-primary px-5 py-1 cursor-pointer rounded-md hover:bg-secondary hover:text-white transition-colors duration-300 flex ml-auto">
          {isEdit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddModal;
