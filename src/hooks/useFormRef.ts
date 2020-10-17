import { useCallback, useMemo, useRef } from "react";

const useFormRef = () => {
  const ref = useRef<Nullable<HTMLFormElement>>(null);

  const handleSetRef = useCallback((incoming) => {
    ref.current = incoming;
  }, []);
  
  const handleSubmit = useCallback(() => {
    if (ref.current)
      ref.current.dispatchEvent(new Event('submit', { cancelable: true }));
  }, []);
  
  return useMemo(() => ({
    handleSetRef,
    handleSubmit
  }), [handleSetRef, handleSubmit])
};

export default useFormRef;
