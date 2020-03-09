import React, { PureComponent } from "react";
import { colors, DropDown, OptionGroupRadio, Option } from "pebble-web";
import { cx } from "emotion";
import {
  inputStyle,
  labelStyle,
  helperTextClass,
  helperTextClassError,
  wrapperStyle
} from "./inputStyles";
import {
  countryCodes,
  INDIA_COUNTRY_OBEJCT,
  CountryItem
} from "@utils/countryCodes";
import {
  countryDropDownClass,
  phoneInput,
  phoneContainerWrapper,
  coutryLabelClass
} from "./phoneInputStyles";

interface Props {
  onChange: (countryCode?: CountryItem, phone?: string) => void;
  countryCode?: string;
  phone: string;
  required?: boolean;
  errorMessage?: any;
  className?: string;
  inputClassName?: string;
  readOnly?: boolean;
  disabled?: boolean;
  helperText?: string;
  placeholder?: string;
  submitCount?: number;
}

interface State {
  isFocused: boolean;
  phone: string;
  countryCode?: CountryItem;
  isTouched: boolean;
}

export class PhoneNumberInput extends PureComponent<Props, State> {
  readonly state: State = {
    isFocused: false,
    phone: this.props.phone,
    countryCode: INDIA_COUNTRY_OBEJCT,
    isTouched: false
  };

  private addFocus = () => {
    this.setState({
      isFocused: true,
      isTouched: true
    });
  };

  private removeFocus = () => {
    this.setState({
      isFocused: false
    });
  };

  private handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const phone = (e.target.value || "").replace(
      /[&\/\\#,+()$~%.'":;*?<>{}!@^_=\-\[\]|`]|[a-z]|[A-Z]/g,
      ""
    );
    this.setState({ phone });
    this.props.onChange(this.state.countryCode, phone);
  };

  render() {
    const {
      phone,
      required,
      errorMessage,
      className,
      inputClassName,
      readOnly,
      disabled,
      helperText,
      placeholder,
      submitCount
    } = this.props;
    const { isFocused, isTouched } = this.state;

    const _inputClassName = cx(inputStyle, inputClassName, phoneInput, {
      _pebble_input_highlight_focused: isFocused,
      _pebble_input_readOnly: !!readOnly,
      _pebble_input_disabled: !!disabled
    });

    const _inputProps = {
      "aria-label": placeholder ? placeholder : undefined,
      className: _inputClassName,
      disabled,
      onChange: this.handleChange,
      readOnly,
      value: phone || ""
    };

    const labelClassName = cx(labelStyle, {
      _pebble_input_label_focused: isFocused
    });

    const _wrapperStyle = cx(wrapperStyle, className);

    return (
      <div
        onFocus={this.addFocus}
        onBlur={this.removeFocus}
        className={_wrapperStyle}
      >
        <label className={labelClassName}>
          {placeholder}
          {required && <span style={{ color: colors.red.base }}>&nbsp;*</span>}
        </label>
        <div className={helperTextClass}>{helperText}</div>
        <div className={phoneContainerWrapper}>
          <DropDown
            buttonLabel={
              this.state.countryCode && this.state.countryCode.country_code
            }
            className={countryDropDownClass}
            labelClassName={coutryLabelClass}
          >
            {({ toggle }) => (
              <OptionGroupRadio
                onChange={(val?: CountryItem) => {
                  this.setState({ countryCode: val });
                  toggle();
                  this.props.onChange(val, this.state.phone);
                }}
              >
                {countryCodes.map((cc: CountryItem, index: number) => {
                  return (
                    <Option
                      key={`${cc.country_code}-${index}`}
                      value={cc}
                      label={
                        // tslint:disable-next-line: jsx-wrap-multiline
                        <span>
                          <span
                            style={{ width: "40px", display: "inline-flex" }}
                          >
                            {cc.country_code}
                          </span>{" "}
                          - &nbsp;&nbsp;{cc.name}
                        </span>
                      }
                    />
                  );
                })}
              </OptionGroupRadio>
            )}
          </DropDown>
          <input type="tel" {..._inputProps} />
        </div>
        {(isTouched || (submitCount && submitCount > 0 ? true : false)) && (
          <div className={helperTextClassError}>{errorMessage}</div>
        )}
      </div>
    );
  }
}

export default PhoneNumberInput;
