import React, { createContext, useState } from "react";
import { IconContext } from "react-icons";

interface IUserContextProviderProps {
  children: React.ReactNode;
}

interface IContext {
  user: object | null;
  login: (data: {}) => void;
}

export const UserContext = createContext<IContext>({} as IContext);

const UserContextProvider: React.FC<IUserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<object | null>(null);

  const login = (data: {}) => setUser(data);

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
