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
const cardsSe = [];
for (let i = 0; i <= 51; i++) {
    cardsSe.push(i);
}
const Page3 = (props, ref) => {
    const { onEnd } = props;
    const [sequence, setSequence] = useState([]);
    const timerRef = useRef();
    useImperativeHandle(
        ref,
        () => {
            return {
                start: (cb) => {
                    const arr = _.shuffle(cardsSe);
                    timerRef.current.start();
                    setSequence(arr);
                },
            };
        },
        []
    );

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
            </div>
            <div className={styleClass.body}>
                <CardBox sequence={sequence} onlyShow={true}></CardBox>
            </div>
        </div>
    );
};

export default React.memo(forwardRef(Page3));
