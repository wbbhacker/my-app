import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useLayoutEffect,
} from 'react';
import _ from 'lodash';

import { Button } from 'antd-mobile';
import styleClass from './index.module.scss';
import Timer from '../../component/Timer';
import CardBox from '../../component/CardBox';

const Page3 = (props, ref) => {
    const { onEnd, currentNumber } = props;
    const [sequence, setSequence] = useState([]);
    const timerRef = useRef();
    useImperativeHandle(
        ref,
        () => {
            return {
                start: (cb) => {
                    timerRef.current.start();
                },
            };
        },
        []
    );
    useEffect(() => {
        if (props.sequence.length > 0) {
            setSequence(props.sequence);
        }
    }, [props.sequence]);

    const endHandle = () => {
        timerRef.current.end((m) => {
            onEnd(m);
        });
    };

    return (
        <div className={styleClass.page}>
            <div className={styleClass.header}>
                <div>
                    <Timer ref={timerRef}></Timer>
                </div>
                <div>
                    <Button
                        color="primary"
                        fill="outline"
                        onClick={endHandle}
                        size="minie"
                    >
                        记忆完成
                    </Button>
                </div>
                <div className={styleClass.number}>
                    第<span style={{ color: 'red' }}>{currentNumber + 1}</span>
                    副
                </div>
            </div>
            <div className={styleClass.body}>
                <CardBox sequence={sequence} onlyShow={true}></CardBox>
            </div>
        </div>
    );
};

export default React.memo(forwardRef(Page3));
