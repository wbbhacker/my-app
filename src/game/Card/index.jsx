import style from './index.module.scss';
import { Card1 } from './cards';
const Card = (props) => {
    return (
        <div className="content">
            <Card1 style={{ width: 2 }}></Card1>
        </div>
    );
};

export default Card;
