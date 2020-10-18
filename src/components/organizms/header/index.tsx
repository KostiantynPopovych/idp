import React, { memo } from 'react';
import { Typography, Row, Col, Button, Modal } from 'antd';
import ItemForm from "components/organizms/form/item";
import Spinner from "components/atoms/spinner";

import useLogic from "./useLogic";
import sm from './styles.module.scss';

const Header = () => {
  const {
    showModal,
    handleToggleModal,
    handleSubmitCreate,
    handleSubmitForm,
    handleSetRef,
    addItemPending,
    queryParams,
    queryExist,
    handleCloseModal
  } = useLogic();

  return (
    <>
      {addItemPending && <Spinner />}
      <Modal
        destroyOnClose
        title="Add item"
        visible={showModal || queryExist}
        onOk={handleSubmitForm}
        onCancel={handleCloseModal}
      >
        <ItemForm initialValues={queryParams} onSubmit={handleSubmitCreate} onSetRef={handleSetRef} />
      </Modal>
      <div className={sm.Wrap}>
        <Row align="middle">
          <Col span={2} push={4}>
            <Typography.Title level={3}>IDP</Typography.Title>
          </Col>
          <Col span={2} push={16}>
           <Button onClick={handleToggleModal}>Add item</Button>
          </Col>
        </Row>
      </div>
    </>
  )
};

export default memo(Header);
