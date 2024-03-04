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
    const { onNext, onPrev, currentNumber, allNumber, curSequence } = props;
    const [sequence, setSequence] = useState([]);
    const cardBoxRef = useRef();

    const timerRef = useRef();
    const cardSquareRef = useRef();

    /*********************callback*********************/

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
        if (curSequence) {
            console.log('shezhi');
            console.log(curSequence);
            setSequence(curSequence);
        }
    }, [curSequence]);

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
    const [last, setLast] = useState(false);
    useEffect(() => {
        if (currentNumber !== undefined && allNumber !== undefined) {
            setLast(currentNumber + 1 === allNumber);
        }
    }, [currentNumber, allNumber]);

    // 上一副
    const prevHandle = () => {
        if (last) {
            cardBoxRef.current.end((a) => {
                onPrev(a);
            });
        } else {
            onPrev();
        }
    };
    // 下一幅
    const nextHandle = () => {
        if (last) {
            let arr = [];
            cardBoxRef.current.end((a) => {
                arr = a;
            });
            timerRef.current.end((m) => {
                onNext(m, arr);
            });
        } else {
            cardBoxRef.current.end((a) => {
                onNext(null, a);
            });
        }

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
                    {currentNumber !== 0 ? (
                        <Button
                            color="primary"
                            fill="outline"
                            onClick={prevHandle}
                            size="mini"
                        >
                            {`上一副`}
                        </Button>
                    ) : null}
                    <Button
                        color="primary"
                        fill="outline"
                        onClick={nextHandle}
                        size="mini"
                    >
                        {last ? `作答完成` : `下一幅`}
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
                    sequence={sequence}
                    ref={cardSquareRef}
                    onClick={cardSelect}
                    onAdd={onAdd}
                ></CardSquare>
            </div>
        </div>
    );
};

export default React.memo(forwardRef(Page4));
