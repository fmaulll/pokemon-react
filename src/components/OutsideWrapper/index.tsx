import React, { FC, useRef } from "react";
import { useOutside } from "../../hooks/useOutside";

interface Props {
  children: React.ReactNode;
  callback: () => void;
}

const OutsideWrapper: FC<Props> = ({ children, callback }) => {
  const wrapperRef = useRef(null);
  useOutside(wrapperRef, callback);

  return <div ref={wrapperRef}>{children}</div>;
};
export default OutsideWrapper;
