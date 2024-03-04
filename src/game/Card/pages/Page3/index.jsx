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

const Page3 = (props, ref) => {
    const { onNext, onPrev, currentNumber, allNumber } = props;
    const [sequence, setSequence] = useState([]);
    const timerRef = useRef();
    /*********************hooks*********************/

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
        console.log(currentNumber !== 0);
        if (props.sequence.length > 0) {
            setSequence(props.sequence);
        }
    }, [props.sequence]);

    /*********************callback*********************/
    const [last, setLast] = useState(false);
    useEffect(() => {
        if (currentNumber !== undefined && allNumber !== undefined) {
            setLast(currentNumber + 1 === allNumber);
        }
    }, [currentNumber, allNumber]);

    // 上下副牌切换
    const nextHandle = () => {
        if (last) {
            timerRef.current.end((m) => {
                onNext(m);
            });
        } else {
            onNext();
        }
    };

    const prevHandle = () => {
        onPrev();
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
                        {last ? `记忆完成` : `下一幅`}
                    </Button>
                </div>
            </div>
            <div className={styleClass.body}>
                <CardBox sequence={sequence} onlyShow={true}></CardBox>
            </div>
        </div>
    );
};

export default React.memo(forwardRef(Page3));
