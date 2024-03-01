import { useEffect, useState } from 'react';
import styleClass from './index.module.scss';
import cardAll from '../cards';
const Card1 = cardAll[0];

const CW = 1; // 重叠0.5rem

function CardBox() {
    const [height, setHeight] = useState(4);
    const [width, setWidth] = useState(2);
    const [rRight, setRRright] = useState(0);
    useEffect(() => {
        const w = (height * 360) / 540;
        setWidth(w);
        setRRright((52 - 1) * w - (52 - 1) * CW);
    }, [height]);

    return (
        <div
            className={styleClass['card-box']}
            style={{ height: `${height}rem` }}
        >
            <div
                className={styleClass['card-list']}
                style={{
                    width: `${width * 52 - CW * 51}rem`,
                    height: `${height}rem`,
                }}
            >
                {cardAll.map((Card, idx) => {
                    return (
                        <div
                            key={idx}
                            style={{
                                width: `${width}rem`,
                                zIndex: 52 - idx,
                                left: `${rRight - idx * (width - CW)}rem`,
                            }}
                        >
                            <Card style={{ width: width }}></Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CardBox;
