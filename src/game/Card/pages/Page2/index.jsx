import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useLayoutEffect,
} from 'react';
import _ from 'lodash';
import styleClass from './index.module.scss';
import { Button } from 'antd-mobile';

const Page2 = (props, ref) => {
    useImperativeHandle(
        ref,
        () => {
            return {
                start: () => {},
            };
        },
        []
    );

    return (
        <div className={styleClass.page}>
            <div className={styleClass.header}></div>
            <div className={styleClass.body}></div>
        </div>
    );
};

export default React.memo(forwardRef(Page2));
