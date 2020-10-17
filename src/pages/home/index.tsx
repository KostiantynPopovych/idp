import React, {memo, useCallback} from 'react';
import ItemCard from "components/molecules/itemCard";
import {CLICK_ACTION} from "constants/global";
import Spinner from "components/atoms/spinner";

import sm from './styles.module.scss';
import useLogic from "./useLogic";

const Home = () => {
  const { items, handleActionClick, loading } = useLogic();

  const renderItem = useCallback((item) => {
    const { id, description, name, image, price } = item;

    return <div key={id} className={sm.Container_Item}>
        <ItemCard
          onDeleteClick={handleActionClick(CLICK_ACTION.DELETE, item)}
          onEditClick={handleActionClick(CLICK_ACTION.EDIT, item)}
          onSaveClick={handleActionClick(CLICK_ACTION.SAVE, item)}
          description={description}
          name={name}
          imageUrl={image}
          price={price}
        />
      </div>
  }, [handleActionClick]);

  return <div className={sm.Container}>
    {loading && <Spinner />}
    {items?.map(renderItem)}
  </div>
};

export default memo(Home);
