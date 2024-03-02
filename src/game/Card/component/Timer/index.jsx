import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useLayoutEffect,
} from 'react';
import styleClass from './index.module.scss';
import countdown from 'countdown';
import moment from 'moment';
const Timer = (props, ref) => {
    const [start, setStart] = useState();
    const timerLabelRef = useRef();
    const update = () => {
        if (!start) {
            requestAnimationFrame(update);
            return;
        }
        let now = moment(new Date());
        let m = moment.duration(now.diff(start));
        let t = `${m.hours()}.${m.minutes()}.${m.seconds()}.${
            m.milliseconds() < 100 ? `0${m.milliseconds()}` : m.milliseconds()
        }`;

        timerLabelRef.current.innerHTML = t;
        requestAnimationFrame(update);
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                start: () => {
                    console.log(`计时开始：`);
                    setStart(moment(new Date()));
                },
            };
        },
        []
    );

    useEffect(() => {
        requestAnimationFrame(update);
    }, [start]);
    return <div ref={timerLabelRef}></div>;
};
export default React.memo(forwardRef(Timer));
