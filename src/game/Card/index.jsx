import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Button } from 'antd-mobile';
import style from './index.module.scss';
import CardBox from './component/CardBox';

const cardsSe = [];
for (let i = 0; i <= 51; i++) {
    cardsSe.push(i);
}

const arr = _.shuffle(cardsSe);
console.log(arr);

const Card = (props) => {
    const [sequence, setSequence] = useState([]);
    const cardBoxRef = useRef();

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
    return (
        <div className="content">
            <CardBox sequence={sequence} ref={cardBoxRef}></CardBox>
            <Button color="primary" fill="solid" onClick={addHandle}>
                添加
            </Button>
        </div>
    );
};

export default Card;
