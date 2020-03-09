import { css } from "emotion";
import { colors } from "pebble-web";

export const typeaheadInput = css({
  marginBottom: 0
});

export const typeaheadCont = css({
  position: "relative",
  width: "100%"
});

export const typeAheadSuggesstionClass = css({
  zIndex: 999,
  boxShadow: `${colors.gray.light} 0px 4px 7px 0px`,
  transformOrigin: "0px 0px"
});

export const addOptionClass = css({
  color: colors.blue.base
});
