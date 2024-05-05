import { useState, useEffect } from "react";

const useAppwrite = (func) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await func();
      if(response) setPosts(response);
    }
    catch(error) {
      Alert.alert('Error', error?.message);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    
    fetchData();
  }, []);

  return {posts, fetchData, loading};
}

export default useAppwrite;