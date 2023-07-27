import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

type Props = {
  children: React.ReactNode;
};

const ModalOffer: React.FC<Props> = ({ children }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect((): (() => void) => {
    modalRoot?.appendChild(elRef.current as Node);
    return () => modalRoot?.removeChild(elRef.current as Node);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default ModalOffer;
