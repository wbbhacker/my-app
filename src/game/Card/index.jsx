import style from './index.module.scss';
import cardAll from './component/cards';
import CardBox from './component/CardBox';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const cardsSe = [];
for (let i = 0; i <= 51; i++) {
    cardsSe.push(i);
}

const Card = (props) => {
    const [sequence, setSequence] = useState(cardsSe);
    useEffect(() => {
        setSequence(_.shuffle(cardsSe));
    }, []);
    return (
        <div className="content">
            <CardBox sequence={sequence}></CardBox>
        </div>
    );
};

export default Card;
