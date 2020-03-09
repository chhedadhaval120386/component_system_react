import { css } from "emotion";
import { colors } from "pebble-web";

export const uploaderCont = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  width: "100%",
  height: "100%"
});

export const fileFolder = css({
  height: 160,
  width: 160,
  border: `1px solid ${colors.gray.light}`,
  borderRadius: "4px",
  position: "relative"
});

export const fileView = css({
  height: 40,
  borderTop: `1px solid ${colors.gray.light}`,
  backgroundColor: `${colors.gray.lighter}`,
  position: "absolute",
  bottom: 0,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 12,
  color: colors.blue.base,
  cursor: "pointer"
});

export const fileIcon = css({
  paddingBottom: 40,
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%"
});

export const viewIcon = css({
  fontSize: 8,
  display: "inline-block",
  marginLeft: 5
});

export const fileIconMain = css({
  fontSize: 14,
  color: `${colors.gray.base}`,
  display: "block"
});

export const fileNameClass = css({
  display: "block",
  fontSize: 12,
  marginTop: 5,
  width: 80,
  maxHeight: 40,
  wordBreak: "break-all"
});

export const removeFile = css({
  position: "absolute",
  top: 5,
  right: 5
});

export const removeFileIcon = css({
  fontSize: 14,
  color: `${colors.gray.base}`,
  cursor: "pointer"
});

export const loaderClass = css({
  display: "block",
  margin: "auto",
  marginBottom: 5
});
