import useToggle from "hooks/useToggle";
import { useCallback, useMemo } from "react";
import useFormRef from "hooks/useFormRef";

const useLogic = () => {
  const { handleToggle: handleToggleModal, exist: showModal } = useToggle();
  
  const { handleSetRef, handleSubmit: handleSubmitForm } = useFormRef();
  
  const handleSubmitCreate = useCallback(data => {
    console.log(data);
    handleToggleModal();
  }, [handleToggleModal]);
  
  return useMemo(() => ({
    handleToggleModal,
    showModal,
    handleSubmitCreate,
    handleSubmitForm,
    handleSetRef
  }), [handleToggleModal, showModal, handleSubmitCreate, handleSubmitForm, handleSetRef])
};

export default useLogic;
