import Header from "components/organizms/header";
import React, { memo, PropsWithChildren } from 'react';

import sm from './styles.module.scss';

const WithHeader = ({ children } :PropsWithChildren<{}>) => (
  <div className={sm.Container}>
    <Header/>
    { children }
  </div>
);

export default memo(WithHeader);
