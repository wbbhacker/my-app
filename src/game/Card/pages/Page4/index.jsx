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

const Page4 = (props, ref) => {
    const { onEnd, currentNumber, allNumber } = props;
    const [sequence, setSequence] = useState([]);
    const cardBoxRef = useRef();

    const timerRef = useRef();
    const cardSquareRef = useRef();

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

    /*********************callback*********************/

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

    // 作答完成
    // 上一副
    const prevHandle = () => {};
    // 下一幅
    const nextHandle = () => {
        let arr = [];

        cardBoxRef.current.end((a) => {
            arr = a;
        });
        timerRef.current.end((m) => {
            onEnd(m, arr);
        });

        cardSquareRef.current.end();
    };

    return (
        <div className={styleClass.page}>
            <div className={styleClass.header}>
                <div>
                    <Timer ref={timerRef}></Timer>
                </div>
                {allNumber > 1 ? (
                    <div className={styleClass.number}>
                        第
                        <span style={{ color: 'red' }}>
                            {currentNumber + 1}
                        </span>
                        副
                    </div>
                ) : null}
                <div>
                    <Button
                        color="primary"
                        fill="outline"
                        onClick={prevHandle}
                        size="mini"
                    >
                        {`上一副`}
                    </Button>
                    <Button
                        color="primary"
                        fill="outline"
                        onClick={nextHandle}
                        size="mini"
                    >
                        {currentNumber + 1 === allNumber
                            ? `作答完成`
                            : `下一幅`}
                    </Button>
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
