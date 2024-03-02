import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Button } from 'antd-mobile';
import style from './index.module.scss';
import CardBox from './component/CardBox';
import Timer from './component/Timer';
import CardSquare from './component/CardSquare';

import Page3 from './pages/Page3';
import Page4 from './pages/Page4';

const cardsSe = [];
for (let i = 0; i <= 51; i++) {
    cardsSe.push(i);
}

const arr = _.shuffle(cardsSe);
console.log(arr);

const Card = (props) => {
    /******************** page3 *******************/
    const [page3Show, setPage3Show] = useState(false);
    const page3Ref = useRef();
    const page3End = (m) => {
        let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
            m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds()
        }`;
        console.log(t);
    };

    useEffect(() => {
        // page3Ref.current.start();
    }, []);

    /******************** page4 *******************/

    const [page4Show, setPage4Show] = useState(true);
    const page4Ref = useRef();
    const page4End = (m) => {
        let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
            m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds()
        }`;
        console.log(t);
    };

    useEffect(() => {
        page4Ref.current.start();
    }, []);
    return (
        <div className="content">
            {page3Show ? <Page3 ref={page3Ref} onEnd={page3End}></Page3> : null}
            {page4Show ? <Page4 ref={page4Ref} onEnd={page4End}></Page4> : null}
        </div>
    );
};

export default Card;
