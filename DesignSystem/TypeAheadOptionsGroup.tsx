import React from "react";
import { typeAheadSuggesstionClass } from "./typeahead.styles";
import { css } from "emotion";
import { OptionGroupRadio, Loader } from "pebble-web";
import { typeAheadOptionsGroupClass } from "./inputStyles";

export const TypeAheadOptionsGroup = (props: any) => {
  const {
    dropdownClass,
    onSelect,
    children,
    handleScroll,
    value,
    loading
  } = props;
  const searchOptionsContainerRef = React.useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (handleScroll) {
      // @ts-ignore
      handleScroll(searchOptionsContainerRef.current.firstElementChild);
    }
  };

  React.useEffect(() => {
    if (
      value &&
      searchOptionsContainerRef.current &&
      !searchOptionsContainerRef.current.firstElementChild
    ) {
      onScroll();
    }
    if (
      handleScroll &&
      searchOptionsContainerRef &&
      searchOptionsContainerRef.current &&
      searchOptionsContainerRef.current.firstElementChild
    ) {
      searchOptionsContainerRef.current.firstElementChild.scrollTo(0, 0);
      // @ts-ignore
      searchOptionsContainerRef.current.firstElementChild.addEventListener(
        "scroll",
        onScroll,
        false
      );

      return () =>
        // @ts-ignore
        searchOptionsContainerRef.current.firstElementChild.removeEventListener(
          "scroll",
          onScroll,
          false
        );
    }
  }, [
    value,
    searchOptionsContainerRef,
    searchOptionsContainerRef.current,
    (searchOptionsContainerRef.current || { firstElementChild: undefined })
      .firstElementChild
  ]);

  return (
    <div
      className={`${typeAheadSuggesstionClass} ${dropdownClass} ${css({
        widht: "100%"
      })}`}
      ref={searchOptionsContainerRef}
    >
      <OptionGroupRadio
        onChange={onSelect}
        className={typeAheadOptionsGroupClass}
      >
        {children}
      </OptionGroupRadio>
      {loading && <Loader />}
    </div>
  );
};
