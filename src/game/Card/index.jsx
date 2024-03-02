import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';

import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';

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

    const [page4Show, setPage4Show] = useState(false);
    const page4Ref = useRef();
    const page4End = (m) => {
        let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
            m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds()
        }`;
        console.log(t);
    };

    useEffect(() => {
        // page4Ref.current.start();
    }, []);

    /******************** page5 *******************/

    const [page5Show, setPage5Show] = useState(true);
    const page5Ref = useRef();
    const page5End = (m) => {
        let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
            m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds()
        }`;
        console.log(t);
    };

    useEffect(() => {
        // page5Ref.current.start();
    }, []);
    return (
        <div className="content">
            {page3Show ? <Page3 ref={page3Ref} onEnd={page3End}></Page3> : null}
            {page4Show ? <Page4 ref={page4Ref} onEnd={page4End}></Page4> : null}
            {page5Show ? <Page5 onEnd={page5End}></Page5> : null}
        </div>
    );
};

export default Card;
