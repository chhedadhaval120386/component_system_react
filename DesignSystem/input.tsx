import React, { PureComponent } from "react";
import { cx, css } from "emotion";
import { colors, Loader } from "pebble-web";
import {
  inputStyle,
  labelStyle,
  helperTextClass,
  helperTextClassError,
  wrapperStyle,
  linkClass,
  passwordEyeClass,
  inputLoader,
  inputTextAreaStyle,
  wrapInputText,
  inputWithSearch,
  mainInputWithSearch
} from "./inputStyles";
import { isWebUri } from "valid-url";

interface Props {
  placeholder: string;
  onChange: (text: string) => void;
  value?: string | number;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  errorMessage?: any;
  readOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "text" | "date" | "password" | "number" | "email" | "tel" | "link";
  helperText?: string;
  inputPlaceHolder?: string;
  setFocussedState?: (isFocused: boolean) => void;
  noLabel?: boolean;
  textArea?: boolean;
  inputProps?: any;
  labelClass?: string;
  withSearch?: boolean;
  submitCount?: number;
}

interface State {
  isFocused: boolean;
  showPassword: boolean;
  isTouched: boolean;
}
export class CustomInput extends PureComponent<Props, State> {
  readonly state: State = {
    isFocused: false,
    showPassword: false,
    isTouched: false
  };

  private addFocus = () => {
    if (this.props.setFocussedState) {
      this.props.setFocussedState(true);
    }
    this.setState({
      isFocused: true,
      isTouched: true
    });
  };

  private removeFocus = () => {
    if (this.props.setFocussedState) {
      this.props.setFocussedState(false);
    }
    this.setState({
      isFocused: false
    });
  };

  private handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let value = e.target.value || "";
    if (this.props.type === "number" || this.props.type === "tel") {
      value = (e.target.value || "").replace(
        /[&\/\\#,+()$~%.'":;*?<>{}!@^_=\-\[\]|`]|[a-z]|[A-Z]/g,
        ""
      );
    }
    this.props.onChange(value);
  };

  render() {
    const {
      value,
      required,
      errorMessage,
      className,
      inputClassName,
      readOnly,
      disabled,
      type,
      helperText,
      placeholder,
      loading,
      inputPlaceHolder,
      inputProps,
      noLabel,
      textArea,
      labelClass,
      withSearch,
      submitCount
    } = this.props;
    const { isFocused, showPassword, isTouched } = this.state;

    const _inputClassName = cx(inputStyle, inputClassName, {
      _pebble_input_highlight_focused: isFocused,
      _pebble_input_readOnly: !!readOnly,
      _pebble_input_disabled: !!disabled,
      inputWithPassword: type === "password",
      inputWithLoader: !!loading,
      [inputTextAreaStyle]: !!textArea,
      [wrapInputText]: !textArea,
      [inputWithSearch]: !!withSearch
    });

    const _inputProps = {
      "aria-label": placeholder ? placeholder : undefined,
      className: _inputClassName,
      disabled,
      onChange: this.handleChange,
      readOnly,
      value: value || "",
      placeholder: inputPlaceHolder
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
        {!noLabel && (
          <>
            <label className={`${labelClass} ${labelClassName}`}>
              {placeholder}
              {required && (
                <span style={{ color: colors.red.base }}>&nbsp;*</span>
              )}
              {type === "link" && isWebUri(value) && !errorMessage && (
                <span
                  className={linkClass}
                  onClick={() => {
                    // @ts-ignore
                    window.open(value, "_blank");
                  }}
                >
                  <i className="pi pi-outgoing-call-2" />
                </span>
              )}
            </label>
            <div className={helperTextClass}>{helperText}</div>
          </>
        )}
        <div style={{ position: "relative" }}>
          {textArea ? (
            <textarea {..._inputProps} {...inputProps} />
          ) : (
            <>
              <div className={withSearch ? mainInputWithSearch : ""}>
                {withSearch && (
                  <i
                    className={`pi pi-search ${css({
                      lineHeight: "48px",
                      padding: "0 20px",
                      position: "absolute"
                    })}`}
                  />
                )}
                <input
                  type={type === "password" && showPassword ? "text" : type}
                  {..._inputProps}
                  {...inputProps}
                />
              </div>
              {loading && (
                <Loader
                  color={colors.blue.base}
                  scale={0.5}
                  className={inputLoader}
                />
              )}
            </>
          )}
          {type === "password" && (
            <div
              className={passwordEyeClass}
              onClick={() => {
                this.setState({ showPassword: !showPassword });
              }}
            >
              {showPassword ? (
                <svg width={24} height={24} fill="none">
                  <g opacity={0.4}>
                    <mask
                      id="a"
                      width={22}
                      height={16}
                      x={1}
                      y={4}
                      maskUnits="userSpaceOnUse"
                    >
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                        clipRule="evenodd"
                      />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#000" d="M-13-13h50v50h-50z" />
                    </g>
                  </g>
                </svg>
              ) : (
                <svg width={24} height={24} fill="none">
                  <g opacity={0.4}>
                    <mask
                      id="b"
                      width={22}
                      height={19}
                      x={1}
                      y={3}
                      maskUnits="userSpaceOnUse"
                    >
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                        clipRule="evenodd"
                      />
                    </mask>
                    <g mask="url(#b)">
                      <path fill="#000" d="M-13-13h50v50h-50z" />
                    </g>
                  </g>
                </svg>
              )}
            </div>
          )}
        </div>
        {!!errorMessage &&
          (isTouched || (submitCount && submitCount > 0 ? true : false)) && (
            <div className={helperTextClassError}>{errorMessage}</div>
          )}
      </div>
    );
  }
}

export default CustomInput;
