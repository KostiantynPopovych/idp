import React, { memo } from 'react';
import { Spin } from 'antd';

import sm from './styles.module.scss';

const Spinner = () => (
  <div className={sm.Container}>
    <Spin size="large" />
  </div>
);

export default memo(Spinner);
