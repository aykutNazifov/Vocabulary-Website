import Header from "@/components/Header";
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContextProvider";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await axios.post("/api/login", { username, password });
      login(user.data);
      router.push("/admin");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data);
    }
  };
  return (
    <div className="text-white">
      <Header />
      <div className="h-[calc(100vh-60px)] flex flex-col items-center justify-center">
        <h1 className="mb-20">Log In Screen</h1>
        <form className="w-[500px]" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1 mb-10">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              id="username"
              className="w-full h-10 bg-transparent border border-solid border-white px-1"
            />
          </div>
          <div className="flex flex-col gap-1 mb-10">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              id="password"
              className="w-full h-10 bg-transparent border border-solid border-white px-1"
            />
          </div>
          <p className="text-red-500">{error ? error : ""}</p>
          <button className="bg-secondary text-white px-6 py-2 rounded-lg ml-auto flex hover:text-secondary hover:bg-white transition-colors duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
