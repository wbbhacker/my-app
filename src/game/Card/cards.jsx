import card1_icon from './img/card1.svg';
import card2_icon from './img/card2.svg';
import card3_icon from './img/card3.svg';
import { Card } from './component/cardCp';

export function Card1(props) {
    return <Card icon={card1_icon} {...props}></Card>;
}
export function Card2(props) {
    return <Card icon={card2_icon} {...props}></Card>;
}
export function Card3(props) {
    return <Card icon={card3_icon} {...props}></Card>;
}
