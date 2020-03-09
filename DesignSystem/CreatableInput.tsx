import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";
import { ValueType, components } from "react-select";
import { css } from "emotion";

const ValueContainer = ({ children, ...props }: any) => {
  return (
    <components.ValueContainer {...props}>
      {props.selectProps.withSearch && (
        <i
          className={`pi pi-search ${css({
            padding: "0 10px"
          })}`}
        />
      )}
      {children}
    </components.ValueContainer>
  );
};

const MultiValueLabel = (props: any) => {
  const {
    data: { value }
  } = props;
  return (
    <div
      className={
        value.trim().toLowerCase() === "and" ||
        value.trim().toLowerCase() === "or"
          ? css`
              background: #ffdaad;
              border-top-left-radius: 20px;
              border-bottom-left-radius: 20px;
              > div {
                background: #ffdaad;
              }
              + div {
                background: orange;
              }
            `
          : ""
      }
    >
      <components.MultiValueLabel {...props} />
    </div>
  );
};

const MultiValueContainer = (props: any) => {
  const {
    data: { value }
  } = props;
  return (
    <div
      className={
        value.trim().toLowerCase() === "and" ||
        value.trim().toLowerCase() === "or"
          ? css`
              > div {
                background: #ffdaad !important;
              }
            `
          : ""
      }
    >
      <components.MultiValueContainer {...props} />
    </div>
  );
};
const Components = {
  DropdownIndicator: null,
  ValueContainer,
  MultiValueLabel,
  MultiValueContainer
};

const createOption = (label: string) => ({
  label,
  value: label
});

export interface NewValue {
  label: string;
  value: string;
}

export class CreatableInput extends Component<any, any> {
  handleChange = (value: ValueType<NewValue>) => {
    const { handleChange } = this.props;
    handleChange(value);
  };

  handleInputChange = (inputValue: string) => {
    const { handleInputChange } = this.props;
    handleInputChange(inputValue);
  };

  handleKeyDown = (event: any) => {
    const { inputValue, value, handleInputChange, handleChange } = this.props;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        handleInputChange("");
        if (value) {
          handleChange([...value, createOption(inputValue)]);
        } else {
          handleChange([createOption(inputValue)]);
        }
        event.preventDefault();
    }
  };

  render() {
    const { inputValue, value, withSearch } = this.props;
    return (
      <CreatableSelect
        components={Components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(val: ValueType<NewValue>) => this.handleChange(val)}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        value={value}
        styles={{
          placeholder: base => ({
            ...base,
            marginLeft: withSearch ? "40px" : "0"
          }),
          multiValue: base => ({
            ...base,
            borderRadius: "20px",
            background: "#DAF8C8 !important",
            margin: "5px"
          }),
          multiValueLabel: base => ({
            ...base,
            background: "#DAF8C8",
            color: "rgba(8, 7, 7, 0.8)",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            fontSize: "12px",
            fontWeight: 500,
            padding: "5px 5px 5px 10px",
            paddingLeft: "10px"
          }),
          multiValueRemove: base => ({
            ...base,
            background: "#7ED14A",
            borderRadius: "100%",
            cursor: "pointer",
            padding: "5px",
            width: "27px",
            justifyContent: "center",
            height: "27px"
          }),
          clearIndicator: base => ({
            ...base,
            cursor: "pointer"
          })
        }}
        {...this.props}
      />
    );
  }
}
