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
import { Button, Stepper } from 'antd-mobile';

const Page1 = (props, ref) => {
    const { singleCb } = props;
    const [step, setStep] = useState(2);

    const singleClick = () => {
        singleCb(1);
    };
    const mmClick = () => {
        singleCb(step);
    };
    const onChange = (value) => {
        setStep(value);
    };

    return (
        <div className={styleClass.page}>
            <div className={styleClass.header}></div>
            <div className={styleClass.body}>
                <div>
                    <img src="" alt="logo"></img>
                </div>
                <div className={styleClass.title}>
                    <p>IMO</p>
                    <p>International Memory Open </p>
                    <p>Memory Training System</p>
                </div>
                <div className={styleClass.titlesub}> Speed Cards</div>

                <div className={styleClass.btn}>
                    <div>
                        <Button
                            color="primary"
                            fill="outline"
                            onClick={singleClick}
                            size="mini"
                        >
                            快速扑克
                        </Button>
                    </div>
                    <div>
                        <Button
                            color="primary"
                            fill="outline"
                            onClick={mmClick}
                            size="mini"
                        >
                            随机扑克
                        </Button>
                        <Stepper
                            min={2}
                            max={20}
                            defaultValue={2}
                            size="mini"
                            onChange={onChange}
                            value={step}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(forwardRef(Page1));
