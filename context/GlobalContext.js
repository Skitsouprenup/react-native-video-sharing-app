import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/usercrud";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const getUser = async () => {
    setUserLoading(true);

    let result = null;

    try {
      result = await getCurrentUser();

      if(result) setUser(result);
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setUserLoading(false);
    }
  }

  useEffect(() => {
    //console.log('useEffect(GlobalContext)')
    getUser();
  },[]);

  const setCurrentUser = async (action = '') => {
    if(action === 'logout') {
      setUser(null);
      return;
    }

    await getUser();
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        userLoading,
        setCurrentUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider