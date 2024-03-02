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
import CardSquare from '../../component/CardSquare';

const cardsSe = [];
for (let i = 0; i <= 51; i++) {
    cardsSe.push(i);
}
const Page4 = (props, ref) => {
    const { onEnd, currentNumber } = props;
    const [sequence, setSequence] = useState([]);
    const cardBoxRef = useRef();

    const timerRef = useRef();
    const cardSquareRef = useRef();

    useImperativeHandle(
        ref,
        () => {
            return {
                start: (cb) => {
                    // const arr = _.shuffle(cardsSe);
                    timerRef.current.start();
                    // setSequence(arr);
                },
            };
        },
        []
    );

    /*********************callback*********************/
    // 作答完成
    const endHandle = () => {
        let arr = [];

        cardBoxRef.current.end((a) => {
            arr = a;
        });
        timerRef.current.end((m) => {
            onEnd(m, arr);
        });

        cardSquareRef.current.end();
    };

    // 卡牌选择
    const cardSelect = (Card, cardIdx) => {
        cardBoxRef.current.add(cardIdx);
    };
    // 卡牌回填
    const onAdd = () => {};

    // 卡牌回填
    const onCb = (idx) => {
        cardSquareRef.current.add(idx);
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
                        size="mini"
                    >
                        作答完成
                    </Button>
                </div>
                <div className={styleClass.number}>
                    第<span style={{ color: 'red' }}>{currentNumber + 1}</span>
                    副
                </div>
            </div>
            <div className={styleClass.body}>
                <CardBox
                    sequence={sequence}
                    ref={cardBoxRef}
                    onCb={onCb}
                ></CardBox>
                <div className={styleClass.line}></div>
                <CardSquare
                    ref={cardSquareRef}
                    onClick={cardSelect}
                    onAdd={onAdd}
                ></CardSquare>
            </div>
        </div>
    );
};

export default React.memo(forwardRef(Page4));
