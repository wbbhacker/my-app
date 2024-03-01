import React, { useEffect, useState } from 'react';
import styleClass from './index.module.scss';
import cardAll from '../cards';
import ReactHammer from 'react-hammerjs';
const Card1 = cardAll[0];

const CW = 1; // 重叠 x rem
const CH = 1; // 凸显出来 x rem

function CardBox(props) {
    /*********************布局*********************/

    const [height, setHeight] = useState(4);
    const [width, setWidth] = useState(2);
    const [rRight, setRRright] = useState(0);

    const [selectedCard, setSelectedCard] = useState(-1);

    useEffect(() => {
        const w = (height * 360) / 540;
        setWidth(w);
        setRRright((52 - 1) * w - (52 - 1) * CW);
    }, [height]);

    /*********************布局*********************/
    const { sequence } = props;
    const [cardSequence, setCardSequence] = useState(new Array(52).fill(-1));

    useEffect(() => {
        if (sequence.length > 0) {
            setCardSequence(sequence);
        }
    }, [sequence]);

    /*********************callback*********************/
    const handleDoubleTap = (Card, idx) => {
        setSelectedCard(idx);
        console.log(`double top${idx}`);
    };

    const renderCard = (idx) => {
        let CardIdx = cardSequence[idx];
        let Card = cardAll[CardIdx];
        return <Card style={{ width: width }}></Card>;
    };

    return (
        <div
            className={styleClass['card-box']}
            style={{ height: `${height + CH}rem` }}
        >
            <div
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
                            {cardSequence[idx] !== -1 ? (
                                <ReactHammer
                                    onDoubleTap={() => {
                                        handleDoubleTap(Card, idx);
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

export default React.memo(CardBox);
