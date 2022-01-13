import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function useScroll() {
  const [scrollEnd, setScrollEnd] = useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.movie);

  const handleScroll = () => {
    // 화면에 보이지 않은 높이도 포함된 페이지의 총 높이.
    const scrollHeight: number = document.documentElement.scrollHeight;
    // 이미 스크롤 되어서 보이지 않은 구간의 높이.
    const scrollTop: number = document.documentElement.scrollTop;
    // 사용자에게 보여지는 페이지의 높이.
    const clientHeight: number = document.documentElement.clientHeight;
    setScrollEnd(scrollTop + clientHeight >= scrollHeight && !loading);
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return { scrollEnd, setScrollEnd, handleScroll };
}
export default useScroll;
