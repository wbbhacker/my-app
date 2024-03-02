import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Button } from 'antd-mobile';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
const cardsSe = [];
for (let i = 0; i <= 51; i++) {
    cardsSe.push(i);
}
const Card = (props) => {
    /******************** page1 *******************/
    const [page1Show, setPage1Show] = useState(true);
    const page1Ref = useRef();

    /******************** page2 *******************/
    const [page2Show, setPage2Show] = useState(false);
    const page2Ref = useRef();

    /******************** page3 *******************/
    const [page3Show, setPage3Show] = useState(false);
    const page3Ref = useRef();

    useEffect(() => {
        // page3Ref.current.start();
    }, []);

    /******************** page4 *******************/

    const [page4Show, setPage4Show] = useState(false);
    const page4Ref = useRef();

    useEffect(() => {
        // page4Ref.current.start();
    }, []);

    /******************** page5 *******************/

    const [page5Show, setPage5Show] = useState(false);
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

    /******************** 逻辑 *******************/

    const [memoryArray, setMemoryArray] = useState([]); // 记忆顺序
    const [answerArray, setAnswerArray] = useState([]); // 作答顺序

    const [memoryTime, setMemoryTime] = useState(); // 记忆时间
    const [answerTime, setAnswerTime] = useState(); // 作答时间
    const [currentNumber, setCurrentNumber] = useState(0); // 当前第x副

    useEffect(() => {
        if (memoryArray.length > 0) {
            console.log(`记忆顺序:`);
            console.log(memoryArray);
            setSequence(memoryArray[currentNumber]);
        }
    }, [memoryArray]);

    // page1 逻辑
    // 模拟操作
    // const startClick = () => {
    //     const arr = _.shuffle(cardsSe);
    //     const arr1 = _.shuffle(cardsSe);
    //     const arr2 = _.shuffle(cardsSe);
    //     setMemoryArray([arr, arr1]);
    //     setPage3Show(true);
    // };
    const singleCb = (idx) => {
        let aaa = [];
        for (let i = 0; i < idx; i++) {
            aaa.push(_.shuffle(cardsSe));
        }
        setMemoryArray(aaa);
        setPage1Show(false);
        setPage3Show(true);
        console.log(idx);
    };

    // page3 逻辑
    const [sequence, setSequence] = useState([]);

    const page3End = (m) => {
        let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
            m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds()
        }`;
        let m1;
        console.log(t);
        if (!memoryTime) {
            m1 = m;
            setMemoryTime(m);
        } else {
            m1 = memoryTime.add(m);
            setMemoryTime(m1);
        }
        let len = memoryArray.length;

        console.log(currentNumber);

        if (currentNumber === len - 1) {
            console.log('总用时：');
            let t = `${m1.hours()}.${m1.minutes()}.${m1.seconds()}.${
                m1.milliseconds() < 100
                    ? `0${m1.milliseconds()}`
                    : m1.milliseconds()
            }`;
            console.log(t);

            setPage3Show(false);
            setPage4Show(true);
            setCurrentNumber(0);
        } else {
            const next = currentNumber + 1;
            setSequence(memoryArray[next]);
            setCurrentNumber(next);
        }
    };

    useEffect(() => {
        if (page3Show) {
            page3Ref.current.start();
        }
    }, [page3Show]);

    // page4 逻辑

    useEffect(() => {
        if (page4Show) {
            page4Ref.current.start();
        }
    }, [page4Show]);

    const page4End = (m, arr) => {
        let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
            m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds()
        }`;

        let m1;
        console.log(t);
        answerArray.push(arr);
        if (!answerTime) {
            m1 = m;
            setAnswerTime(m);
        } else {
            m1 = answerTime.add(m);
            setAnswerTime(m1);
        }
        let len = memoryArray.length;
        if (currentNumber === len - 1) {
            console.log('总用时：');

            let t = `${m1.hours()}.${m1.minutes()}.${m1.seconds()}.${
                m1.milliseconds() < 100
                    ? `0${m1.milliseconds()}`
                    : m1.milliseconds()
            }`;
            console.log(t);
            console.log(answerArray);
            setPage4Show(false);
            setPage5Show(true);
            setCurrentNumber(0);
        } else {
            const next = currentNumber + 1;
            setCurrentNumber(next);
        }
        console.log(t);
        console.log(arr);
    };

    // page5 逻辑
    useEffect(() => {
        if (page5Show) {
            page5Ref.current.calc();
        }
    }, [page5Show]);

    return (
        <div className="content">
            {/* <Button color="primary" fill="outline" onClick={startClick}>
                Start
            </Button> */}

            {page1Show ? (
                <Page1 ref={page1Ref} singleCb={singleCb}></Page1>
            ) : null}
            {page2Show ? <Page2 ref={page2Ref}></Page2> : null}

            {page3Show ? (
                <Page3
                    ref={page3Ref}
                    onEnd={page3End}
                    sequence={sequence}
                    currentNumber={currentNumber}
                    allNumber={memoryArray.length}
                ></Page3>
            ) : null}
            {page4Show ? (
                <Page4
                    currentNumber={currentNumber}
                    ref={page4Ref}
                    onEnd={page4End}
                    allNumber={memoryArray.length}
                ></Page4>
            ) : null}
            {page5Show ? (
                <Page5
                    ref={page5Ref}
                    onEnd={page5End}
                    memoryArray={memoryArray}
                    answerArray={answerArray}
                    memoryTime={memoryTime}
                    answerTime={answerTime}
                ></Page5>
            ) : null}
        </div>
    );
};

export default Card;
