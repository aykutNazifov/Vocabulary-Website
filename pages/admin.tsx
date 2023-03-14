import AddModal from "@/components/AddModal";
import Header from "@/components/Header";
import { UserContext } from "@/context/UserContextProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Admin = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState({});
  const [level, setLevel] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [filtredArray, setFiltredArray] = useState([]);

  const queryClient = useQueryClient();

  const deleteWord = async (wordId: string) => {
    try {
      await axios.delete("/api/words/" + wordId);
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationFn: deleteWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  });

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
    if (searchValue === "") {
      setFiltredArray(data);
    } else {
      setFiltredArray(
        data.filter((w: any) =>
          w.word.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, data]);

  useEffect(() => {
    refetch();
  }, [level]);

  useEffect(() => {
    if (!user) {
      router.push("login");
    }
  }, []);

  const onDeleteWord = (id: string) => {
    mutation.mutate(id);
  };

  const onUpdateWord = (id: string) => {
    setSelectedWord(data.find((item: any) => item._id === id));
    setShowEditModal(true);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="text-white">
      <Header />
      {showAddModal && <AddModal setShowModal={setShowAddModal} />}
      {showEditModal && (
        <AddModal
          isEdit
          setShowModal={setShowEditModal}
          values={selectedWord}
        />
      )}
      <div className="max-w-[1440px] w-full mx-auto py-4 px-2">
        <div className="w-full flex justify-between">
          <select
            onChange={(e) => setLevel(e.target.value)}
            className="bg-secondary text-white w-28 rounded-md px-2"
          >
            <option value="All">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="T">T</option>
            <option value="C2">C2</option>
          </select>
          <div>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search a word..."
              className="border-b-2 border-b-primary border-solid bg-transparent px-2"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-primary px-3 py-1 cursor-pointer rounded-md hover:bg-secondary hover:text-white transition-colors duration-300"
          >
            Add New Word
          </button>
        </div>
        <div className="mt-10">
          {filtredArray.map((item: any) => (
            <div
              key={item._id}
              className="w-full flex items-center gap-3 border-b border-solid border-white py-1 px-1"
            >
              <p className="text-xl">{item.word}</p>
              <button
                className="text-red-500 text-xl"
                onClick={() => onDeleteWord(item._id)}
              >
                <AiFillDelete />
              </button>
              <button
                onClick={() => onUpdateWord(item._id)}
                className="text-green-500 text-xl"
              >
                <AiFillEdit />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
