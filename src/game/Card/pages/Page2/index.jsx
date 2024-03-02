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
    const [value, setValue] = useState(5);
    useImperativeHandle(
        ref,
        () => {
            return {
                start: (cb) => {
                    let flag = 5;
                    const timer = setInterval(() => {
                        flag = flag - 1;
                        if (flag === 0) {
                            setValue('GO!!!');
                            clearInterval(timer);
                            setTimeout(() => {
                                if (cb) cb();
                            }, 500);
                        } else {
                            setValue(flag);
                        }
                    }, 700);
                },
            };
        },
        []
    );

    return (
        <div className={styleClass.page}>
            <div className={styleClass.body}>
                <div>{value}</div>
            </div>
        </div>
    );
};

export default React.memo(forwardRef(Page2));
