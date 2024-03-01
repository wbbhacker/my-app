import style from './index.module.scss';
import cardAll from './cards';
console.log(cardAll);

const Card = (props) => {
    return (
        <div className="content">
            <div className={style['card-list']}>
                {/* {Object.keys(cards).map((key, idx) => {
                    let Cp = cards[key];
                    return <Cp style={{ width: 1.5 }} key={idx}></Cp>;
                })} */}
                {cardAll.map((Card) => {
                    return <Card style={{ width: 1.5 }}></Card>;
                })}
            </div>
        </div>
    );
};

export default Card;
