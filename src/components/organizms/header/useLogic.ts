import useToggle from "hooks/useToggle";
import { useCallback, useMemo } from "react";
import useFormRef from "hooks/useFormRef";
import { useMutation } from "@apollo/client";
import { ADD_ITEM, updateItemsList } from "queries/items";
import { normalizeToItem } from 'utils/transformItems';

const useLogic = () => {
  const { handleToggle: handleToggleModal, exist: showModal } = useToggle();
  
  const { handleSetRef, handleSubmit: handleSubmitForm } = useFormRef();

  const [addItem, { loading: addItemPending }] = useMutation(ADD_ITEM, { update: updateItemsList });

  const handleSubmitCreate = useCallback(data => {
    addItem({ variables: { newItem: normalizeToItem(data) } });
    handleToggleModal();
  }, [addItem, handleToggleModal]);
  
  return useMemo(() => ({
    addItemPending,
    handleToggleModal,
    showModal,
    handleSubmitCreate,
    handleSubmitForm,
    handleSetRef
  }), [addItemPending, handleToggleModal, showModal, handleSubmitCreate, handleSubmitForm, handleSetRef])
};

export default useLogic;
