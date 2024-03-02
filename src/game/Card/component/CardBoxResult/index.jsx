import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useLayoutEffect,
    useCallback,
} from 'react';
import styleClass from './index.module.scss';
import cardAll from '../cards';

const CW = 1.5; // 重叠 x rem
const CH = 1; // 凸显出来 x rem
const WW = 5.5; // 宽度
function CardBox(props, ref) {
    /*********************布局*********************/

    const [height, setHeight] = useState(4);
    const [width, setWidth] = useState(2);
    const [rRight, setRRright] = useState(0);

    useEffect(() => {
        const w = (height * 360) / 540;
        const r = (52 - 1) * w - (52 - 1) * CW;
        setWidth(w);
        setRRright(r);
    }, [height]);

    /*********************卡牌顺序*********************/
    const { sequence } = props; // 初始化牌的顺序
    const [cardSequence, setCardSequence] = useState([]);
    const [zSequence, setZSequence] = useState([]);
    const [calcWW, setCalcWW] = useState(52);

    useEffect(() => {
        if (sequence.length > 0) {
            setCardSequence(sequence);
            console.log(sequence.length);
            let wwww = sequence.length;
            setCalcWW(wwww);
            const w = (height * 360) / 540;
            const r = (wwww - 1) * w - (wwww - 1) * CW;
            setRRright(r);
        }
    }, [sequence]);

    useEffect(() => {
        if (props.zSequence.length > 0) {
            console.log(props.zSequence);
            setZSequence(props.zSequence);
        }
    }, [props.zSequence]);

    /*********************滚动*********************/
    const boxRef = useRef();

    /*********************callback*********************/

    // 按压删除
    const { onlyShow } = props;

    useLayoutEffect(() => {
        if (onlyShow) {
            boxRef.current.scrollLeft = 99999;
        }
    }, [cardSequence]);

    /*********************render*********************/

    const renderCard = (idx) => {
        let CardIdx = cardSequence[idx];
        let Card = cardAll[CardIdx];
        return <Card style={{ width: width }}></Card>;
    };
    const renderCard1 = (idx) => {
        let CardIdx = zSequence[idx];
        let Card = cardAll[CardIdx];
        return <Card style={{ width: width }}></Card>;
    };

    return (
        <div
            ref={boxRef}
            className={styleClass['card-box']}
            style={{ height: `${(height + CH) * 2}rem`, width: `${WW}rem` }}
        >
            <div style={{ width: '100%' }}>
                <div
                    className={styleClass['card-list']}
                    style={{
                        width: `${width * calcWW - CW * (calcWW - 1)}rem`,
                        height: `${height}rem`,
                        marginTop: `${CH}rem`,
                    }}
                >
                    {/* 最右边为第一张扑克 */}
                    {cardSequence.map((Card, idx) => {
                        return (
                            <>
                                {cardSequence[idx] !== undefined ? (
                                    <div
                                        style={{
                                            width: `${width}rem`,
                                            zIndex: calcWW - idx,
                                            left: `${
                                                rRight - idx * (width - CW)
                                            }rem`,
                                            height: `${height}rem`,
                                        }}
                                    >
                                        {renderCard(idx)}
                                    </div>
                                ) : (
                                    <div
                                        key={idx}
                                        style={{
                                            width: `${width}rem`,
                                            zIndex: calcWW - idx,
                                            left: `${
                                                rRight - idx * (width - CW)
                                            }rem`,
                                            height: `${height}rem`,
                                        }}
                                    ></div>
                                )}
                            </>
                        );
                    })}
                </div>
                <div
                    className={styleClass['card-list']}
                    style={{
                        width: `${width * calcWW - CW * (calcWW - 1)}rem`,
                        height: `${height}rem`,
                        marginTop: `0.1rem`,
                    }}
                >
                    {/* 最右边为第一张扑克 */}
                    {zSequence.map((Card, idx) => {
                        return (
                            <>
                                {zSequence[idx] !== undefined ? (
                                    <div
                                        style={{
                                            width: `${width}rem`,
                                            zIndex: 52 - idx,
                                            left: `${
                                                rRight - idx * (width - CW)
                                            }rem`,
                                            height: `${height}rem`,
                                        }}
                                    >
                                        {renderCard1(idx)}
                                    </div>
                                ) : (
                                    <div
                                        key={idx}
                                        style={{
                                            width: `${width}rem`,
                                            zIndex: 52 - idx,
                                            left: `${
                                                rRight - idx * (width - CW)
                                            }rem`,
                                            height: `${height}rem`,
                                        }}
                                    ></div>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default React.memo(forwardRef(CardBox));
