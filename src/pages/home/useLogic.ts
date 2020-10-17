import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ITEMS, DELETE_ITEM, UPDATE_ITEM, GetItemsResponse, updateItemsList } from "queries/items";
import { CLICK_ACTION } from "constants/global";
import useFormRef from "hooks/useFormRef";
import { normalizeFromItem, normalizeToItem } from 'utils/transformItems';

const useLogic = () => {
  const { data, loading: getItemsPending } = useQuery<GetItemsResponse>(GET_ITEMS);

  const [deleteItem, { loading: deleteItemPending } ] = useMutation(DELETE_ITEM, { update: updateItemsList });

  const [updateItem, { loading: updateItemPending, client } ] = useMutation(UPDATE_ITEM, { update: updateItemsList });
  
  const [selectedItem, setSelectedItem] = useState<Nullable<NormalizedItem>>(null);

  const { handleSetRef, handleSubmit: handleSubmitForm } = useFormRef();

  const normalizedData = data?.items.items.map(normalizeFromItem);

  const anyInPending = getItemsPending || deleteItemPending || updateItemPending;

  const handleEditItem = useCallback((item: NormalizedItem) => {
    setSelectedItem(item);
  }, []);

  const handleDeleteItem = useCallback(({ id: itemId } : NormalizedItem) => {
    deleteItem({ variables: { itemId } })
  }, [deleteItem]);
  
  const handleActionClick = useCallback((accessor: string, item: NormalizedItem) => () => {
    switch (accessor) {
      case CLICK_ACTION.EDIT:
        handleEditItem(item);
        break;

      case CLICK_ACTION.DELETE:
        handleDeleteItem(item);
        break;
    }
  }, [handleDeleteItem, handleEditItem]);

  const handleClearSelectedItem = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleSubmitUpdate = useCallback((values) => {
    const { id, version } = selectedItem as NormalizedItem;
    // @ts-ignore
    client.link.headers.set('X-Contentful-Version', version);
    updateItem({ variables: { updatedItem: normalizeToItem(values), config: { id, version } } });
    handleClearSelectedItem();
  }, [selectedItem, client, updateItem, handleClearSelectedItem]);
  
  return useMemo(() => ({
    handleActionClick,
    anyInPending,
    items: normalizedData,
    selectedItem,
    handleSetRef,
    handleSubmitForm,
    handleClearSelectedItem,
    handleSubmitUpdate
  }),[handleActionClick, anyInPending, normalizedData, selectedItem, handleSetRef, handleSubmitForm, handleClearSelectedItem, handleSubmitUpdate])
};

export default useLogic;
