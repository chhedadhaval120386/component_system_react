import React, { useState } from "react";
import { candidateIconClass } from "@styles/project.styles";
import { colors, Popper } from "pebble-web";
import { css } from "emotion";

const CommonSVGWrapper = (props: any) => {
  const [isHovered, onHover] = useState(false);
  const hoverColor = props.hoverFill || colors.blue.base;
  const fill = props.fill || colors.gray.base;

  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      fill,
      hoverColor,
      isHovered
    });
  });

  if (props.toolTipText) {
    return (
      <Popper
        label={() => (
          <div
            className={candidateIconClass}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            {children}
          </div>
        )}
        placement="top"
        isOpen={isHovered}
        closeOnOutsideClick
        controlled
        popperBackgroundColor={colors.gray.dark}
      >
        {() => (
          <div
            className={css({
              background: colors.gray.dark,
              color: colors.white.base,
              padding: "8px 12px",
              borderRadius: "4px",
              maxWidth: "500px"
            })}
          >
            {props.toolTipText}
          </div>
        )}
      </Popper>
    );
  }
  return (
    <div
      className={candidateIconClass}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {children}
    </div>
  );
};

export default CommonSVGWrapper;
