import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Button } from 'antd-mobile';
import style from './index.module.scss';
import CardBox from './component/CardBox';
import Timer from './component/Timer';
import CardSquare from './component/CardSquare';

import Page3 from './pages/Page3';

const cardsSe = [];
for (let i = 0; i <= 51; i++) {
    cardsSe.push(i);
}

const arr = _.shuffle(cardsSe);
console.log(arr);

const Card = (props) => {
    const [sequence, setSequence] = useState([]);
    const cardBoxRef = useRef();
    const cardSquareRef = useRef();
    const timerRef = useRef();

    useEffect(() => {
        // setSequence(_.shuffle(cardsSe));
        // setSequence([...sequence.push(arr.pop())]);
    }, []);

    /*********************callback*********************/
    const addHandle = () => {
        let elem = arr.pop();
        sequence.push(elem);
        setSequence([...sequence]);
        cardBoxRef.current.add();
    };

    //卡牌选择
    const cardSelect = (Card, cardIdx) => {
        cardBoxRef.current.add(cardIdx);
    };
    // 卡牌回填
    const onAdd = () => {};

    // 卡牌回填
    const onCb = (idx) => {
        cardSquareRef.current.add(idx);
    };

    // 计时开始

    const startClick = () => {
        timerRef.current.start();
    };

    const endClick = () => {
        timerRef.current.end((m) => {
            let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
                m.milliseconds() < 100
                    ? `0${m.milliseconds()}`
                    : m.milliseconds()
            }`;
            console.log(t);
        });
    };

    // ***********************

    const page3Ref = useRef();
    const page3End = (m) => {
        let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
            m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds()
        }`;
        console.log(t);
    };

    useEffect(() => {
        page3Ref.current.start();
    }, []);

    return (
        <div className="content">
            <Timer ref={timerRef}></Timer>
            <Button onClick={startClick}>Start</Button>
            <Button onClick={endClick}>end</Button>
            <CardBox sequence={sequence} ref={cardBoxRef} onCb={onCb}></CardBox>
            {/* <Button color="primary" fill="solid" onClick={addHandle}>
                添加
            </Button> */}
            <CardSquare
                ref={cardSquareRef}
                onClick={cardSelect}
                onAdd={onAdd}
            ></CardSquare>

            {/* ********************************************************* */}
            <Page3 ref={page3Ref} onEnd={page3End}></Page3>
        </div>
    );
};

export default Card;
