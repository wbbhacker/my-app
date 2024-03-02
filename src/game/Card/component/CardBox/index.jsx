import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useLayoutEffect,
} from 'react';
import styleClass from './index.module.scss';
import cardAll from '../cards';
import ReactHammer from 'react-hammerjs';

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

    useEffect(() => {
        if (sequence.length > 0) {
            setCardSequence(sequence);
        }
    }, [sequence]);

    /*********************滚动*********************/
    const listRef = useRef();
    const boxRef = useRef();

    useLayoutEffect(() => {
        if (cardSequence.length > 0) {
            boxRef.current.scrollLeft =
                listRef.current.children[cardSequence.length - 1].offsetLeft;
        }
    }, [cardSequence]);

    // useLayoutEffect(() => {
    //     boxRef.current.scrollLeft = listRef.current.children[0].offsetLeft;
    // }, []);

    /*********************hook*********************/

    useImperativeHandle(
        ref,
        () => {
            return {
                add: (CardIdx) => {
                    // 添加卡牌
                    console.log(`添加卡牌：${CardIdx}`);
                    if (selectedCard === undefined) {
                        cardSequence.push(CardIdx);
                        console.log(cardSequence);
                        setCardSequence([...cardSequence]);
                    } else {
                    }
                    // console.log(CardIdx);
                },
            };
        },
        []
    );

    /*********************callback*********************/
    // 双击选择
    const [selectedCard, setSelectedCard] = useState(undefined);

    const handleDoubleTap = (Card, idx) => {
        if (selectedCard === idx) {
            setSelectedCard(undefined);
        } else {
            console.log(`selected：${idx}`);
            setSelectedCard(idx);
        }
        console.log(`double top：${idx}`);
    };

    // 按压删除
    const onPress = (idx) => {
        console.log(`Press：${idx}`);
        console.log(selectedCard);
        if (idx !== selectedCard) {
            cardSequence.splice(idx, 1);
            setCardSequence([...cardSequence]);
            if (selectedCard !== undefined) {
                if (selectedCard > idx) {
                    setSelectedCard(selectedCard - 1);
                }
            }
        }
    };

    /*********************render*********************/

    const renderCard = (idx) => {
        let CardIdx = cardSequence[idx];
        let Card = cardAll[CardIdx];
        return <Card style={{ width: width }}></Card>;
    };

    return (
        <div
            ref={boxRef}
            className={styleClass['card-box']}
            style={{ height: `${height + CH}rem`, width: `${WW}rem` }}
        >
            <div
                ref={listRef}
                className={styleClass['card-list']}
                style={{
                    width: `${width * 52 - CW * 51}rem`,
                    height: `${height}rem`,
                    marginTop: `${CH}rem`,
                }}
            >
                {/* 最右边为第一张扑克 */}
                {cardAll.map((Card, idx) => {
                    return (
                        <>
                            {cardSequence[idx] !== undefined ? (
                                <ReactHammer
                                    onDoubleTap={() => {
                                        handleDoubleTap(Card, idx);
                                    }}
                                    onPress={() => {
                                        onPress(idx);
                                    }}
                                    key={idx}
                                    options={{
                                        touchAction: 'pan-x pan-y',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${width}rem`,
                                            zIndex: 52 - idx,
                                            left: `${
                                                rRight - idx * (width - CW)
                                            }rem`,
                                            height: `${height}rem`,
                                            top: `-${
                                                selectedCard === idx ? CH : 0
                                            }rem`,
                                        }}
                                    >
                                        {renderCard(idx)}
                                    </div>
                                </ReactHammer>
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
    );
}

export default React.memo(forwardRef(CardBox));
