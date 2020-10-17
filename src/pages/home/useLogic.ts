import { useCallback, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS, GetItemsResponse } from "queries/items";
import {CLICK_ACTION} from "constants/global";

const useLogic = () => {
  const { data, loading } = useQuery<GetItemsResponse>(GET_ITEMS);

  const handleEditItem = useCallback((item: Item) => {
    console.log('edit', item);
  }, []);

  const handleDeleteItem = useCallback((item: Item) => {
    console.log('delete', item);
  }, []);

  const handleSaveItem = useCallback((item: Item) => {
    console.log('save', item);
  }, []);
  
  const handleActionClick = useCallback((accessor: string, item: Item) => () => {
    switch (accessor) {
      case CLICK_ACTION.EDIT:
        handleEditItem(item);
        break;

      case CLICK_ACTION.DELETE:
        handleDeleteItem(item);
        break;

      case CLICK_ACTION.SAVE:
        handleSaveItem(item);
        break;
    }
  }, [handleDeleteItem, handleEditItem, handleSaveItem]);
  
  return useMemo(() => ({
    handleActionClick,
    loading,
    items: data?.imageCollection.items
  }),[data, handleActionClick, loading])
};

export default useLogic;
