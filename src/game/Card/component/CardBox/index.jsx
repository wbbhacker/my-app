import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import styleClass from "./index.module.scss";
import cardAll from "../cards";
import ReactHammer from "react-hammerjs";
import { Button } from "antd-mobile";

const CW = 1.5; // 重叠 x rem
const CH = 1; // 凸显出来 x rem
const WW = 5.5; // 宽度
function CardBox(props, ref) {
  /*********************布局*********************/

  const [height, setHeight] = useState(4);
  const [width, setWidth] = useState(2);
  const [rRight, setRRright] = useState(0);

  useEffect(() => {
    const w = (height * 360) / 540;
    const r = (52 - 1) * w - (52 - 1) * CW;
    setWidth(w);
    setRRright(r);
  }, [height]);

  /*********************卡牌顺序*********************/
  const { sequence } = props; // 初始化牌的顺序
  const [cardSequence, setCardSequence] = useState([]);

  useEffect(() => {
    if (sequence.length > 0) {
      setCardSequence(sequence);
    }
  }, [sequence]);

  /*********************滚动*********************/
  const listRef = useRef();
  const boxRef = useRef();

  useLayoutEffect(() => {
    if (cardSequence.length > 0) {
      boxRef.current.scrollLeft =
        listRef.current.children[cardSequence.length - 1].offsetLeft;
    }
  }, [cardSequence]);

  /*********************hook*********************/
  const [selectedCard, setSelectedCard] = useState(undefined);
  const { onCb } = props;
  const [op, setOp] = useState(0);

  const opAdd = (v) => {
    console.log(v);
    setOp(v);
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        add: (CardIdx) => {
          // 添加卡牌
          console.log(`添加卡牌：${CardIdx}`);
          console.log(`selectedCard:   ${selectedCard}`);
          console.log(`op:   ${op}`);
          if (selectedCard === undefined) {
            cardSequence.push(CardIdx);
            setCardSequence([...cardSequence]);
          } else {
            if (op === 0) {
              onCb(cardSequence[selectedCard]);
              cardSequence.splice(selectedCard, 1, CardIdx);
              setSelectedCard(undefined);
            } else {
              console.log(op);
              if (op === -1) {
                //后插
                cardSequence.splice(selectedCard + 1, 0, CardIdx);
                setCardSequence([...cardSequence]);
                setSelectedCard(undefined);
                setOp(0);
              }

              if (op === 1) {
                //后插
                cardSequence.splice(selectedCard, 0, CardIdx);
                setCardSequence([...cardSequence]);
                setSelectedCard(undefined);
                setOp(0);
              }
            }
          }
          // console.log(CardIdx);
        },
        end: (cb) => {
          cb([...cardSequence]);

          setCardSequence([]);
        },
      };
    },
    [selectedCard, cardSequence, op]
  );

  /*********************callback*********************/
  // 双击选择

  const handleDoubleTap = (Card, idx) => {
    if (selectedCard === idx) {
      setSelectedCard(undefined);
    } else {
      //   console.log(`selected：${idx}`);
      setSelectedCard(idx);
    }
    // console.log(`double top：${idx}`);
  };

  // 按压删除
  const { onlyShow } = props;

  useLayoutEffect(() => {
    if (onlyShow) {
      boxRef.current.scrollLeft = 40000;
    }
  }, [cardSequence]);
  const onPress = (idx) => {
    console.log(`Press：${idx}`);
    console.log(selectedCard);
    if (onlyShow) return;
    if (idx !== selectedCard) {
      onCb(cardSequence[idx]);
      cardSequence.splice(idx, 1);
      setCardSequence([...cardSequence]);
      if (selectedCard !== undefined) {
        if (selectedCard > idx) {
          setSelectedCard(selectedCard - 1);
        }
      }
    }
  };

  /*********************render*********************/

  const renderCard = (idx) => {
    let CardIdx = cardSequence[idx];
    let Card = cardAll[CardIdx];
    return <Card style={{ width: width }}></Card>;
  };

  return (
    <div
      ref={boxRef}
      className={styleClass["card-box"]}
      style={{ height: `${height + CH}rem`, width: `${WW}rem` }}
    >
      <div
        ref={listRef}
        className={styleClass["card-list"]}
        style={{
          width: `${width * 52 - CW * 51}rem`,
          height: `${height}rem`,
          marginTop: `${CH}rem`,
        }}
      >
        {/* 最右边为第一张扑克 */}
        {cardAll.map((Card, idx) => {
          return (
            <>
              {cardSequence[idx] !== undefined ? (
                <ReactHammer
                  onDoubleTap={() => {
                    handleDoubleTap(Card, idx);
                  }}
                  onPress={() => {
                    onPress(idx);
                  }}
                  key={idx}
                  options={{
                    touchAction: "pan-x pan-y",
                  }}
                >
                  <div
                    style={{
                      width: `${width}rem`,
                      zIndex: 52 - idx,
                      left: `${rRight - idx * (width - CW)}rem`,
                      height: `${height}rem`,
                      top: `-${selectedCard === idx ? CH / 2 : 0}rem`,
                    }}
                  >
                    {selectedCard === idx ? (
                      <div
                        className={styleClass.op}
                        style={{ top: `-${CH / 2}rem` }}
                      >
                        <Button
                          color="primary"
                          fill={op === -1 ? "solid" : "outline"}
                          onClick={() => {
                            opAdd(-1);
                          }}
                          size="mini"
                        >
                          {`后插`}
                        </Button>
                        <Button
                          color="primary"
                          fill={op === 0 ? "solid" : "outline"}
                          onClick={() => {
                            opAdd(0);
                          }}
                          size="mini"
                        >
                          {`替换`}
                        </Button>
                        <Button
                          color="primary"
                          fill={op === 1 ? "solid" : "outline"}
                          onClick={() => {
                            opAdd(1);
                          }}
                          size="mini"
                        >
                          {`前插`}
                        </Button>
                      </div>
                    ) : null}

                    {renderCard(idx)}
                  </div>
                </ReactHammer>
              ) : (
                <div
                  key={idx}
                  style={{
                    width: `${width}rem`,
                    zIndex: 52 - idx,
                    left: `${rRight - idx * (width - CW)}rem`,
                    height: `${height}rem`,
                  }}
                ></div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(forwardRef(CardBox));
