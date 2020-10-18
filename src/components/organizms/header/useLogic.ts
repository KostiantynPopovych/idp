import useToggle from "hooks/useToggle";
import { useCallback, useMemo } from "react";
import useFormRef from "hooks/useFormRef";
import { useMutation } from "@apollo/client";
import { ADD_ITEM, updateItemsList } from "queries/items";
import { normalizeToItem } from 'utils/transformItems';
import useQueryParams from "hooks/useQueryParams";
import { useHistory } from 'react-router-dom';
import sanitizeObjectValues from "utils/sanitizeObjectValues";

const useLogic = () => {
  const { handleToggle: handleToggleModal, exist: showModal } = useToggle();
  
  const { replace } = useHistory();
  
  const { handleSetRef, handleSubmit: handleSubmitForm } = useFormRef();

  const [addItem, { loading: addItemPending, client }] = useMutation(ADD_ITEM, { update: updateItemsList });

  const queryParams = useQueryParams();
  
  const queryExist = useMemo(() => !!Object.keys(queryParams).length, [queryParams]);
  
  const handleCloseModal = useCallback(() => {
    if (queryExist) {
      replace('/idp/home');
    } else {
      handleToggleModal();
    }
  }, [handleToggleModal, queryExist, replace]);
  
  const handleSubmitCreate = useCallback(data => {
    // @ts-ignore
    client.link.headers.set('X-Contentful-Content-Type', 'image');
    addItem({ variables: { newItem: normalizeToItem(sanitizeObjectValues(data)) } });
    handleCloseModal();
  }, [addItem, client, handleCloseModal]);
  
  return useMemo(() => ({
    addItemPending,
    handleToggleModal,
    showModal,
    handleCloseModal,
    handleSubmitCreate,
    handleSubmitForm,
    handleSetRef,
    queryExist,
    queryParams
  }), [addItemPending, handleToggleModal, showModal, handleCloseModal, handleSubmitCreate, handleSubmitForm, handleSetRef, queryExist, queryParams])
};

export default useLogic;
