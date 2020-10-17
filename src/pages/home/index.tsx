import React, { memo, useCallback } from 'react';
import ItemCard from "components/molecules/itemCard";
import { CLICK_ACTION } from "constants/global";
import Spinner from "components/atoms/spinner";
import { Modal } from 'antd';
import ItemForm, { InitialValues } from 'components/organizms/form/item';

import sm from './styles.module.scss';
import useLogic from "./useLogic";

const Home = () => {
  const {
    items,
    handleActionClick,
    anyInPending,
    selectedItem,
    handleSetRef,
    handleSubmitForm,
    handleClearSelectedItem,
    handleSubmitUpdate
  } = useLogic();

  const renderItem = useCallback((item) => {
    const { id, description, name, image, price } = item;

    return <div key={id} className={sm.Container_Item}>
        <ItemCard
          onDeleteClick={handleActionClick(CLICK_ACTION.DELETE, item)}
          onEditClick={handleActionClick(CLICK_ACTION.EDIT, item)}
          description={description}
          name={name}
          imageUrl={image}
          price={price}
        />
      </div>
  }, [handleActionClick]);

  return <div className={sm.Container}>
    <Modal
      title="Update item"
      visible={!!selectedItem}
      onOk={handleSubmitForm}
      onCancel={handleClearSelectedItem}
    >
      <ItemForm initialValues={selectedItem as InitialValues} onSubmit={handleSubmitUpdate} onSetRef={handleSetRef} />
    </Modal>
    {anyInPending && <Spinner />}
    {items?.map(renderItem)}
  </div>
};

export default memo(Home);
