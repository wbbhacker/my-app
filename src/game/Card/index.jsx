import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Button } from 'antd-mobile';
import style from './index.module.scss';
import CardBox from './component/CardBox';

import CardSquare from './component/CardSquare';

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

    return (
        <div className="content">
            <CardBox sequence={sequence} ref={cardBoxRef} onCb={onCb}></CardBox>
            {/* <Button color="primary" fill="solid" onClick={addHandle}>
                添加
            </Button> */}
            <CardSquare
                ref={cardSquareRef}
                onClick={cardSelect}
                onAdd={onAdd}
            ></CardSquare>
        </div>
    );
};

export default Card;
