import React, {memo, useCallback} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Space, Input, Row, Typography } from 'antd';

import { FIELDS } from "./config";
import sm from './styles.module.scss';

interface InitialValues {
  name?: string;
  description?: string;
  image?: string;
}

interface Props {
  onSetRef: (ref: HTMLFormElement) => void;
  onSubmit: (args: any) => void;
  initialValues?: InitialValues;
}

const spaceStyles = {
  width: '100%'
};

const Item = ({ onSetRef, onSubmit, initialValues }: Props) => {
  const { handleSubmit, control, errors } = useForm({ defaultValues: initialValues });

  const handleRenderField = useCallback((errors) => ({ name, label, validation }: { name: string; label: string; validation: { required: boolean } } ) => (
    <Row key={name}>
      <label>
        <Typography.Title level={5}>{label}</Typography.Title>
      </label>
      <Controller
        name={name}
        as={<Input placeholder={label} className={errors[name] ? sm.Error : undefined} />}
        control={control}
        rules={validation}
      />
    </Row>
  ), [control]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={onSetRef}>
      <Space direction="vertical" size="large" style={spaceStyles}>
        { FIELDS.map(handleRenderField(errors)) }
      </Space>
    </form>
  );
};

export default memo(Item);
