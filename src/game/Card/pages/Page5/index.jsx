import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useLayoutEffect,
} from 'react';
import _ from 'lodash';
import styleClass from './index.module.scss';
import CardBoxResult from '../../component/CardBoxResult';
import { Button } from 'antd-mobile';

import logoIcon from '../../component/img/log.jpg'


const cardsSe = [];
for (let i = 0; i <= 51; i++) {
    cardsSe.push(i);
}
function formatTime(m) {
    let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
        m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds()
    }`;
    let ms = m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds();
    return `${m.minutes() > 0 ? `${m.minutes()}分` : ''}${m.seconds()}.${ms}秒`;
}
const Page5 = (props, ref) => {
    const { memoryArray, answerArray, memoryTime, answerTime } = props;
    const [sequence, setSequence] = useState(cardsSe);
    const [zSequence, setZSequence] = useState([]);

    const [score, setScore] = useState(0);
    const [mTime, setMTime] = useState('10分10秒');
    const [zTime, setZTime] = useState('10分10秒');
    useImperativeHandle(
        ref,
        () => {
            return {
                calc: (cb) => {
                    console.log('计算结果：');
                    let m = [];
                    memoryArray.forEach((item) => {
                        m = m.concat(item);
                    });
                    console.log(m);
                    setSequence(m);

                    let z = [];
                    answerArray.forEach((item) => {
                        let itemClone = [...item];
                        if (itemClone.length < 52) {
                            for (let i = 0; i < 52; i++) {
                                if (itemClone[i] === undefined) {
                                    itemClone.push(undefined);
                                }
                            }
                            z = z.concat(itemClone);
                        } else {
                            z = z.concat(itemClone);
                        }
                    });
                    console.log(z);
                    setZSequence(z);

                    setMTime(formatTime(memoryTime));
                    setZTime(formatTime(answerTime));

                    let s = 0;
                    if (memoryArray.length === 1) {
                        let answer = answerArray[0];
                        let memory = memoryArray[0];
                        for (let i = 0; i < memory.length; i++) {
                            if (memory[i] === answer[i]) {
                                s += 1;
                            } else {
                                break;
                            }
                        }
                        setScore(s);
                        console.log(s);
                    } else {
                        memoryArray.forEach((item, idx) => {
                            let ss = 0;
                            let flag = true;
                            for (let i = 0; i < item.length; i++) {
                                if (item[i] !== answerArray[idx][i]) {
                                    flag = false;
                                }
                            }
                            if (flag) {
                                ss = 52;
                            }
                            s += ss;
                        });
                        console.log(s);
                        setScore(s);
                    }
                    if (cb) cb();
                },
            };
        },
        []
    );

    const endHandle = () => {
        window.location.reload();
    };

    return (
        <div className={styleClass.page}>
            <div className={styleClass.header}>
                <div></div>
                <div>
                    <Button
                        color="primary"
                        fill="outline"
                        onClick={endHandle}
                        size="mini"
                    >
                        再次训练
                    </Button>
                </div>
            </div>
            <div className={styleClass.body}>
                <div className={styleClass.logo}>
                    <img className={styleClass.logoicon} src={logoIcon} alt="logo"></img>
                    <span>IMO</span>
                </div>
                <div className={styleClass.result}>
                    <div className={styleClass.item}>
                        <div className={styleClass.name}>得分:</div>
                        <div className={styleClass.value}>{`${score}分`}</div>
                    </div>
                    <div className={styleClass.item}>
                        <div className={styleClass.name}>记忆时间:</div>
                        <div className={styleClass.value}>{mTime}</div>
                    </div>
                    <div className={styleClass.item}>
                        <div className={styleClass.name}>作答时间:</div>
                        <div className={styleClass.value}>{zTime}</div>
                    </div>
                </div>
                <div className={styleClass.title1}>记忆顺序</div>
                <CardBoxResult
                    sequence={sequence}
                    zSequence={zSequence}
                    onlyShow={true}
                ></CardBoxResult>
                <div className={styleClass.title2}>作答顺序</div>
            </div>
        </div>
    );
};

export default React.memo(forwardRef(Page5));
