import { css } from "emotion";
import { useEffect, useRef, useState } from "react";
import { colors } from "pebble-web";

interface Props {
  text: string;
  isVisible?: boolean;
  children?: any;
}

const toolTipClass = css({
  position: "fixed",
  background: colors.gray.dark,
  color: colors.white.base,
  padding: "8px",
  borderRadius: "4px",
  maxWidth: "500px",
  willChange: "transform",
  top: "0",
  left: "0",
  zIndex: 9999
});

const CustomToolTip = (props: Props) => {
  const { text, isVisible, children } = props;

  const mainRef = useRef(null);

  const textRef = useRef(null);

  const [isHovered, onHover] = useState(false);

  useEffect(() => {
    if (!!mainRef && !!mainRef.current) {
      // @ts-ignore
      mainRef.current.onmouseenter = () => {
        onHover(true);
      };
      // @ts-ignore
      mainRef.current.onmouseleave = () => {
        onHover(false);
      };
    }
  });

  let styles: { transform?: string; top: number; left: number } = {
    transform: undefined,
    left: 0,
    top: 0
  };

  if (mainRef && mainRef.current) {
    styles = {
      // @ts-ignore
      transform: `translate3d(${-0.75 * mainRef.current.clientWidth +
        // @ts-ignore
        mainRef.current.offsetLeft}px, ${-0.5 * mainRef.current.clientHeight +
        // @ts-ignore
        mainRef.current.offsetTop}px, 0)`,
      // @ts-ignore
      left: -0.75 * mainRef.current.clientHeight,
      top: 0
    };
    if (textRef && textRef.current) {
      // @ts-ignore
      styles.top = -0.75 * textRef.current.clientHeight;
    }
  }

  const visible = isHovered || isVisible;

  return (
    <div className={css({ position: "relative" })} ref={mainRef}>
      <div
        className={`
                    ${!visible ? css({ display: "none" }) : ""}
                    ${toolTipClass}
                    tool-tip
                `}
        style={styles}
        ref={textRef}
      >
        <div>{text}</div>
      </div>
      {children}
    </div>
  );
};

export default CustomToolTip;
