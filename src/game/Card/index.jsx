import style from './index.module.scss';
import cardAll from './component/cards';
import CardBox from './component/CardBox';

const Card = (props) => {
    return (
        <div className="content">
            {/* <div className={style['card-list']}>
                {cardAll.map((Card, idx) => {
                    return <Card style={{ width: 1.5 }} key={idx}></Card>;
                })}
            </div> */}
            <CardBox></CardBox>
        </div>
    );
};

export default Card;
