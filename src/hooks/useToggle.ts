import {useCallback, useMemo, useState} from "react";

const useToggle = () => {
  const [exist, setExist] = useState(false);
  
  const handleToggle = useCallback(() => {
    setExist(prevState => !prevState);
  }, []);
  
  return useMemo(() => ({
    exist,
    handleToggle
  }), [exist, handleToggle]);
};

export default useToggle;
