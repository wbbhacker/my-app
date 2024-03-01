import { useEffect, useState } from 'react';
import styleClass from './cardCp.module.scss';

export function Card(props) {
    const { style, icon } = props;
    const [curStyle, setCurStyle] = useState({});

    useEffect(() => {
        if (style) {
            let o = { ...style };

            if (style.width) {
                o.width = `${style.width}rem`;
                o.height = `${(540 / 360) * style.width}rem`;
            }

            setCurStyle(o);
        }
    }, [style]);

    return (
        <div className={styleClass.card} style={curStyle}>
            <img src={icon}></img>
        </div>
    );
}
