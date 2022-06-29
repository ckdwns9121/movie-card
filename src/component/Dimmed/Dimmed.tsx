import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Dimmed.module.scss";

const cn = classNames.bind(styles);

const Dimmed = ({ open, opacity, forceOpen, onClose }: any) => {
  const [view, setView] = useState(open);
  const [useOpacity, setUseOpacity] = useState(opacity);

  const hasOpacity = opacity !== undefined;

  const onTransitionEnd = (e: any) => {
    setView(open);
  };

  useEffect(() => {
    if (open || forceOpen) {
      setUseOpacity(hasOpacity ? opacity : 1);
    } else {
      setUseOpacity(0);
    }
  }, [open, forceOpen, opacity, hasOpacity]);

  return (
    <>
      {(open || forceOpen || view) && (
        <div
          className={cn("dimmed", { force: forceOpen })}
          style={{
            opacity: useOpacity,
          }}
          onTransitionEnd={onTransitionEnd}
          onTouchMove={onClose}
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Dimmed;
