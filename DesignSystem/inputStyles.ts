import { mixins, typography } from "pebble-web";
import { css } from "emotion";
import { colors } from "pebble-shared";

const animation = "all 0.3s cubic-bezier(.64,.09,.08,1)";

export const inputMarginBottom = 24;

export const wrapperStyle = css({
  position: "relative",
  display: "flex",
  width: "100%",
  flexDirection: "column",
  // height: 116,
  marginBottom: inputMarginBottom
});

export const inputStyle = css({
  outline: 0,
  border: `1px solid ${colors.gray.light}`,
  backgroundColor: `${colors.gray.lighter}`,
  padding: "16px 16px 16px 16px",
  height: 48,
  borderRadius: 0,
  ...typography.normal.regular,
  width: "100%",
  transition: animation,
  "&._pebble_input_highlight_focused": {
    border: `1px solid ${colors.blue.base}`
  },
  "&._pebble_input_readOnly": {
    color: colors.gray.dark,
    border: `1px solid ${colors.gray.light}`
  },
  "&._pebble_input_disabled": {
    cursor: "not-allowed",
    pointerEvents: "none",
    color: colors.gray.base
  }
});

export const wrapInputText = css({
  ...mixins.textEllipsis
});

export const inputWithSearch = css({
  display: "flex",
  border: `1px solid rgba(0,0,0,0)`,
  backgroundColor: `rgba(0,0,0,0)`,
  paddingLeft: "50px"
});

export const mainInputWithSearch = css({
  border: `1px solid ${colors.gray.light}`,
  backgroundColor: `${colors.gray.lighter}`
});

export const labelStyle = css({
  color: colors.gray.dark,
  fontSize: 16,
  lineHeight: "12px",
  transition: animation,
  display: "inline-block",
  "&._pebble_input_label_focused": {
    color: colors.gray.darker
  }
});

export const helperTextClass = css({
  ...typography.s.regular,
  marginTop: 8,
  marginBottom: 12,
  textAlign: "left",
  color: colors.gray.base
});

export const helperTextClassError = css({
  ...typography.s.regular,
  marginTop: 12,
  lineHeight: "10px",
  textAlign: "left",
  color: colors.red.base
});

export const linkClass = css({
  fontSize: "10px",
  marginLeft: "10px",
  color: colors.blue.base,
  cursor: "pointer"
});

export const passwordEyeClass = css({
  position: "absolute",
  right: 0,
  top: 0,
  height: 46,
  paddingTop: 10,
  width: 40,
  textAlign: "center",
  zIndex: 1,
  cursor: "pointer"
});

export const inputWithPassword = css({
  paddingRight: 40
});

export const inputWithLoader = css({
  paddingRight: 60
});

export const inputLoader = css({
  position: "absolute",
  right: 0,
  top: 0,
  height: 46,
  paddingTop: 20,
  width: 70,
  textAlign: "center",
  zIndex: 1
});

export const inputTextAreaStyle = css({
  height: 88,
  resize: "none"
});

export const unselectedGroupRadio = css({
  display: "inline-flex",
  height: "48px",
  width: "110px",
  justifyContent: "center",
  border: `1px solid ${colors.gray.light}`,
  color: colors.gray.dark,
  "&:not(:first-child):not(:last-child)": {
    borderLeft: 0,
    borderRight: 0
  },
  "@media (max-width: 768px)": {
    width: "90px"
  }
});

export const selectedGroupRadio = css({
  border: `1px solid ${colors.blue.base}`,
  backgroundColor: colors.blue.base,
  color: colors.white.base
});

export const typeAheadOptionsGroupClass = css({
  position: "absolute",
  left: 0,
  right: 0,
  boxShadow: `rgb(224, 224, 224) 0px 4px 7px 0px`,
  "> div > div": {
    width: "100%"
  }
});

export const tagClass = css({
  i: {
    borderRadius: "100% !important",
    "&:hover": {
      backgroundColor: "#FFBDAD",
      color: "#DE350B"
    }
  }
});

export const tag = css({
  marginRight: "5px",
  marginBottom: "5px",
  wordBreak: "break-word",
  height: "100%",
  padding: "5px 10px"
});

export const negationTag = css({
  borderRadius: "20px",
  backgroundColor: "#FFE8E8 !important",
  color: `${colors.gray.darker} !important`,
  i: {
    background: "#FFC0C0"
  }
});

export const normalTag = css({
  borderRadius: "20px",
  backgroundColor: "#E8E8FF !important",
  color: `${colors.gray.darker} !important`,
  i: {
    background: "#C0C0FF"
  }
});
