import React, { useEffect, useReducer, useRef } from "react";
import Dimmed from "../Dimmed/Dimmed";

import styles from "./BottomModal.module.scss";

const TOUCH_START = "TOUCH_START";
const TOUCH_MOVE = "TOUCH_MOVE";
const TOUCH_END = "TOUCH_END";

const TOUCHED = "touched";
const CLICKED = "clicked";

const initialState = {
  [CLICKED]: false,
  [TOUCHED]: false,
  position: -1,
  diff: 0,
};

const touchReducer = (state: any, action: any) => {
  switch (action.type) {
    case TOUCH_START:
      return {
        diff: 0,
        ...action.payload,
      };
    case TOUCH_MOVE:
      return {
        ...state,
        diff: state.position - action.position,
      };
    case TOUCH_END:
      return initialState;
    default:
      return initialState;
  }
};

const SwipeNav = ({ className, children, state, onChangeState, touchSize, delta }: any) => {
  const SwipeRef = useRef<any>(null);
  const [swipeState, dispatch] = useReducer(touchReducer, initialState);
  const { touched, clicked, position, diff } = swipeState;

  const isPress = touched || clicked;

  const offsetHeight = SwipeRef.current?.offsetHeight; // Box의 높이
  const height_ratio = diff / offsetHeight; // 전체 : 변한 높이 비율 값
  const opacity = state ? 1 + height_ratio : height_ratio; // 실제 적용할 opacity 값

  const dispatchStart = (push_type: any, clientPos: any) =>
    dispatch({
      type: TOUCH_START,
      payload: {
        [push_type]: true,
        position: clientPos,
      },
    });
  const dispatchMove = (clientPos: any) => {
    const sign = state ? -1 : 1;
    const calculate_pos = (position - clientPos) * sign;
    if (offsetHeight >= calculate_pos && calculate_pos > 0) {
      dispatch({
        type: TOUCH_MOVE,
        position: clientPos,
      });
    }
  };

  /* ---------- Touch Event ---------- */
  const onTouchStart = (e: any) => {
    dispatchStart(TOUCHED, e.touches[0].clientY);
  };
  const onTouchMove = (e: any) => {
    if (touched) {
      dispatchMove(e.touches[0].clientY);
    }
  };
  /* ---------- Touch Event ---------- */
  /* ---------- Mouse Event ---------- */
  const onMouseDown = (e: any) => dispatchStart(CLICKED, e.clientY);
  const onMouseMove = (e: any) => {
    if (clicked) {
      dispatchMove(e.clientY);
    }
  };
  const onEnd = () => {
    if (Math.abs(diff) >= delta) {
      onChangeState(!state);
    }
    dispatch({ type: TOUCH_END });
  };
  /* ---------- Mouse Event ---------- */

  const onClose = () => onChangeState(false);

  useEffect(() => {
    const handleTouchMove = (event: any) => {
      if (isPress) {
        event.preventDefault();
      }
    };
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isPress]);

  return (
    <>
      <div
        ref={SwipeRef}
        className={className}
        style={
          isPress
            ? {
                bottom: 60 + diff,
                transition: "none",
              }
            : {}
        }
      >
        {children}
        <div
          className={styles["swipe"]}
          style={{
            top: `-${touchSize - 100}px`,
            height: `${touchSize}px`,
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onEnd}
          onTouchCancel={onEnd}
        />
      </div>
      <Dimmed open={state} forceOpen={isPress} opacity={opacity} onClose={onClose} />
    </>
  );
};

export default SwipeNav;
