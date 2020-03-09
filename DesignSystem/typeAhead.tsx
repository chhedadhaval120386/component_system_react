import React, { PureComponent } from "react";
import CustomInput from "./input";
import { OutsideClick } from "pebble-web";
import { helperTextClassError } from "./inputStyles";
import { typeaheadInput, typeaheadCont } from "./typeahead.styles";
import debounce from "just-debounce-it";
import { FormikErrors } from "formik";
import { TypeAheadOptionsGroup } from "./TypeAheadOptionsGroup";

export interface NonSpecificTypeAheadProps<OptionType> {
  placeholder: string;
  errorMessage?: string | FormikErrors<any>;
  inputClass?: string;
  inputType?: "text" | "number" | "email";
  helperText?: string;
  inputPlaceHolder?: string;
  required?: boolean;
  disabled?: boolean;
  dropdownClass?: string;
  className?: string;
  loading?: boolean;
  noLabel?: boolean;
  valueExtractor: (value: OptionType) => string;
  initialValue?: string;
  withSearch?: boolean;
  handleScroll?: (ele: HTMLDivElement) => void;
  areOptionsLoading?: boolean;
}

export interface TypeaheadProps<OptionType>
  extends NonSpecificTypeAheadProps<OptionType> {
  onChange: (text: string, props: TypeaheadProps<OptionType>) => void;
  onSelect: (
    _value: OptionType | undefined,
    props: TypeaheadProps<OptionType>
  ) => void;
  debounceTime: number;
}

interface State {
  value: string;
  showSuggesstions: boolean;
}

export class TypeAhead<OptionType> extends PureComponent<
  TypeaheadProps<OptionType>,
  State
> {
  state: State = {
    showSuggesstions: false,
    value: this.props.initialValue || ""
  };

  static defaultProps = {
    debounceTime: 500,
    onClear: () => {}
  };

  private closeSuggesstions = () => {
    this.setState({ showSuggesstions: false });
  };

  private onChange = () => {
    this.props.onChange(this.state.value, this.props);
  };

  private debouncedChange = debounce(this.onChange, this.props.debounceTime);

  private registerChange = (value: string) => {
    this.setState(
      {
        value
      },
      this.debouncedChange
    );
  };

  onSelect = (_value?: OptionType) => {
    this.props.onSelect(_value, this.props);
    this.setState({
      showSuggesstions: false,
      value: (_value && this.props.valueExtractor(_value)) || ""
    });
  };

  render() {
    const {
      placeholder,
      errorMessage,
      inputClass,
      inputType,
      helperText,
      inputPlaceHolder,
      required,
      disabled,
      children,
      dropdownClass,
      className,
      loading,
      noLabel,
      withSearch,
      handleScroll,
      areOptionsLoading
    } = this.props;

    const { value, showSuggesstions } = this.state;

    return (
      <OutsideClick
        className={className}
        disabled={!showSuggesstions}
        onOutsideClick={this.closeSuggesstions}
      >
        <div className={typeaheadCont}>
          <CustomInput
            placeholder={placeholder}
            onChange={this.registerChange}
            value={value}
            required={required}
            disabled={disabled}
            className={`${inputClass} ${typeaheadInput}`}
            type={inputType}
            loading={loading}
            helperText={helperText}
            noLabel={noLabel}
            withSearch={withSearch}
            inputPlaceHolder={inputPlaceHolder}
            setFocussedState={(isFocused: boolean) => {
              if (isFocused) {
                this.setState({ showSuggesstions: isFocused });
              }
            }}
          />
          {showSuggesstions && children && (
            <TypeAheadOptionsGroup
              handleScroll={handleScroll}
              dropdownClass={dropdownClass}
              value={value}
              loading={areOptionsLoading}
              onSelect={this.onSelect}
            >
              {children}
            </TypeAheadOptionsGroup>
          )}
          {!!errorMessage && !showSuggesstions && (
            <div className={helperTextClassError}>{errorMessage}</div>
          )}
        </div>
      </OutsideClick>
    );
  }
}

export default TypeAhead;
