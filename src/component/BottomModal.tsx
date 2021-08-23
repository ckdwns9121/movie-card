import React, { useEffect, useReducer, useRef } from 'react';

import styles from './BottomModal.module.scss';

const TOUCH_START = 'TOUCH_START' ;
const TOUCH_MOVE = 'TOUCH_MOVE' as const;
const TOUCH_END = 'TOUCH_END' as const;

const TOUCHED = 'touched' as const;
const CLICKED = 'clicked' as const;

type State={    
    clicked : boolean,
    touched : boolean,
    position: number,
    diff: number,
}
type Action  = 
| {type : 'TOUCH_START',payload : any} 
| {type : 'TOUCH_MOVE', position : number} 
| {type : 'TOUCH_END'} 

type Props={
  className? : any,
  children :React.ReactNode,
  state:any,
  onChangeState?:any,
  touchSize:any,
  delta:any,
}

const initialState = {
  [CLICKED]: false,
  [TOUCHED]: false,
  position: -1,
  diff: 0,
};

const touchReducer = (state : State, action : Action ) => {
  switch (action.type) {
    case 'TOUCH_START':
      return {
        ...state,
        ...action.payload,
      };
    case "TOUCH_MOVE":
      return {
        ...state,
        diff: state.position - action.position,
      };
    case "TOUCH_END":
      return {
        [CLICKED]: false,
        [TOUCHED]: false,
        position: state.position,
        diff: state.diff
      };
    default:
      return initialState;
  }
};

const SwipeNav = ({
  className,
  children,
  state,
  onChangeState,
  touchSize,
  delta,
} : Props) => {
  const SwipeRef = useRef<any>(null);
  const [swipeState, dispatch] = useReducer(touchReducer, initialState);
  const { touched, clicked, position, diff } = swipeState;

  const isPress = touched || clicked;

  const offsetHeight = SwipeRef.current?.offsetHeight; // Box의 높이
  const height_ratio = diff / offsetHeight; // 전체 : 변한 높이 비율 값
  const opacity = state ? 1 + height_ratio : height_ratio; // 실제 적용할 opacity 값

  const dispatchStart = (push_type : any, clientPos : any) =>
    dispatch({
      type: TOUCH_START,
      payload: {
        [push_type]: true,
        position: clientPos,
      },
    });
  const dispatchMove = (clientPos :any) => {
    const sign = state ? -1 : 1;
    const touch_pos = (position - clientPos) * sign;
    console.log(touch_pos);
    if (offsetHeight >= touch_pos && touch_pos > -300) {
      dispatch({
        type: TOUCH_MOVE,
        position: clientPos,
      });
    }

 
  };

  /* ---------- Touch Event ---------- */
  const onTouchStart = (e : any) => {
    console.log('touch start');
    dispatchStart(TOUCHED, e.touches[0].clientY);
  };
  const onTouchMove = (e : any) => {
    if (touched) {
        // console.log(e.touches[0].clientY);
      dispatchMove(e.touches[0].clientY);
    }
  };
  /* ---------- Touch Event ---------- */
  /* ---------- Mouse Event ---------- */
  const onMouseDown = (e : any) => dispatchStart(CLICKED, e.clientY);
  const onMouseMove = (e : any) => {
    if (clicked) {
      dispatchMove(e.clientY);
    }
  };
  const onEnd = () => {
    if (Math.abs(diff) >= delta) {
    //   onChangeState(!state);
    }
    dispatch({ type: TOUCH_END });
  };
  /* ---------- Mouse Event ---------- */

//   const onClose = () => onChangeState(false);

  useEffect(() => {
    const handleTouchMove = (event:any) => {
      if (isPress) {
        event.preventDefault();
      }
    };
    window.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPress]);


  useEffect(()=>{
    console.log(swipeState);
  },[swipeState])
  return (
    <>
      <div
        ref={SwipeRef}
        className={className}
        style={{
            bottom: 375+diff,
            transition: 'none'
          }}
      >
        {children}
        <div
          className={styles['swipe']}
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
    </>
  );
};

export default SwipeNav;
