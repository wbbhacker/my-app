import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useLayoutEffect,
} from 'react';
import ReactHammer from 'react-hammerjs';

import styleClass from './index.module.scss';
import cardAll from '../cards';

const CardSquare = (props, ref) => {
    const [width, setWidth] = useState(0.6);
    const [selectedCard, setSelectedCard] = useState({});

    /*********************callback*********************/
    const { onClick } = props;
    // 选择

    const handleTap = (Card, idx) => {
        if (!selectedCard[idx]) {
            onClick(Card, idx);
            selectedCard[idx] = true;
            setSelectedCard({ ...selectedCard });
        }
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                add: (CardIdx) => {
                    console.log(`添加卡牌: ${CardIdx}`);
                    selectedCard[CardIdx] = false;
                    setSelectedCard({ ...selectedCard });
                },
            };
        },
        [selectedCard]
    );
    return (
        <div className={styleClass.list}>
            {cardAll.map((Card, idx) => {
                return (
                    <ReactHammer
                        onTap={() => {
                            handleTap(Card, idx);
                        }}
                        options={{
                            touchAction: 'pan-x pan-y',
                        }}
                    >
                        <div
                            className={styleClass['item']}
                            style={{
                                width: `${width}rem`,
                                height: `${(540 / 360) * width}rem`,
                            }}
                            key={idx}
                        >
                            {!selectedCard[idx] ? (
                                <Card style={{ width: width }}></Card>
                            ) : null}
                        </div>
                    </ReactHammer>
                );
            })}
        </div>
    );
};

export default React.memo(forwardRef(CardSquare));
