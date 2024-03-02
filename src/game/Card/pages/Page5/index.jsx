import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useLayoutEffect,
} from 'react';
import _ from 'lodash';
import styleClass from './index.module.scss';
import CardBoxResult from '../../component/CardBoxResult';

const cardsSe = [];
for (let i = 0; i <= 51; i++) {
    cardsSe.push(i);
}
const Page5 = () => {
    const [sequence, setSequence] = useState(cardsSe);

    return (
        <div className={styleClass.page}>
            <div className={styleClass.header}></div>
            <div className={styleClass.body}>
                <div className={styleClass.result}>
                    <div className={styleClass.item}>
                        <div className={styleClass.name}>得分:</div>
                        <div className={styleClass.value}></div>
                    </div>
                    <div className={styleClass.item}>
                        <div className={styleClass.name}>记忆时间:</div>
                        <div className={styleClass.value}></div>
                    </div>
                    <div className={styleClass.item}>
                        <div className={styleClass.name}>回忆时间:</div>
                        <div className={styleClass.value}></div>
                    </div>
                </div>
                <div className={styleClass.title1}>记忆顺序</div>
                <CardBoxResult
                    sequence={sequence}
                    onlyShow={true}
                ></CardBoxResult>
                <div className={styleClass.title2}>作答顺序</div>
            </div>
        </div>
    );
};

export default React.memo(Page5);
