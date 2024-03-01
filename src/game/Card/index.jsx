import style from './index.module.scss';
import * as cards from './cards';

const Card = (props) => {
    return (
        <div className="content">
            <div className={style['card-list']}>
                {Object.keys(cards).map((key, idx) => {
                    let Cp = cards[key];
                    return <Cp style={{ width: 1 }} key={idx}></Cp>;
                })}
            </div>
        </div>
    );
};

export default Card;
