import { useState, useEffect, useCallback } from 'react';

let timer: any = null;

function useScroll() {
  const [scrollEnd, setScrollEnd] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    // 화면에 보이지 않은 높이도 포함된 페이지의 총 높이.
    const scrollHeight: number = document.documentElement.scrollHeight;
    // 이미 스크롤 되어서 보이지 않은 구간의 높이.
    const scrollTop: number = document.documentElement.scrollTop;
    // 사용자에게 보여지는 페이지의 높이.
    const clientHeight: number = document.documentElement.clientHeight;
    setScrollEnd(scrollTop + clientHeight >= scrollHeight);
  }, []);
  const throttle = useCallback(() => {
    if (timer) return;
    timer = setTimeout(() => {
      handleScroll();
      timer = null;
    }, 300);
  }, [handleScroll]);
  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', throttle);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', throttle);
    };
  }, [throttle]);
  return { scrollEnd, setScrollEnd, handleScroll };
}
export default useScroll;
