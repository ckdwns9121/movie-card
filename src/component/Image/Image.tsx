import { useRef, useState, useEffect } from "react";
interface IProps {
  src: string;
  alt: string;
}
const PLACE_HOLDER = "https://uploads.codesandbox.io/uploads/user/6d7a2e27-f6e6-4ec3-a76a-fca4e0a3fb22/EF_m-placeholder.jpg";
export default function Image({ src }: IProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const [isLoad, setIsLoad] = useState(false);

  function onIntersection(entries: IntersectionObserverEntry[], io: IntersectionObserver) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoad(true);
      }
    });
  }

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(onIntersection, {
        // 확인을 위해 이미지 절반이 나타날 때 로딩한다.
        threshold: 0.5,
      });
    }

    imgRef.current && observerRef.current.observe(imgRef.current);
  }, []);

  return <img ref={imgRef} src={isLoad ? src : PLACE_HOLDER} width="100%" height="100%" alt="" style={{ display: "block" }} />;
}
