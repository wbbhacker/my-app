import card1_icon from './img/card1.svg';
import { Card } from './component/cardCp';

export function Card1(props) {
    return (
        <div>
            <Card icon={card1_icon} {...props}></Card>
        </div>
    );
}
