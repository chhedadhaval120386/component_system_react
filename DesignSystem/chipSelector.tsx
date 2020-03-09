import React, { PureComponent, ReactElement } from "react";
import TypeAhead, { NonSpecificTypeAheadProps } from "./typeAhead";
import { Option, Tag } from "pebble-web";
import { css } from "emotion";
import { helperTextClassError } from "./inputStyles";

interface Props<OptionType> {
  typeAheadProps: NonSpecificTypeAheadProps<OptionType>;
  onSelect: (
    _value: OptionType | undefined,
    chips: Array<{ value: OptionType; isCancellable: boolean }>,
    setLoading?: (loading: boolean) => void
  ) => void;
  debounceTime: number;
  optionsQueryResolver: (text: string) => OptionType[];
  optionsLabelExtractor: (option: OptionType) => string;
  chips: Array<{ value: OptionType; isCancellable: boolean }>;
  onChipRemove: (
    removedChip: OptionType,
    chips: Array<{ value: OptionType; isCancellable: boolean }>,
    setLoading?: (loading: boolean) => void
  ) => void;
  chipClass?: string;
  errorMessage?: any;
  enableAddOption?: boolean;
  addOptionValueExtractor?: (option: OptionType) => string | ReactElement;
  addOptionCreator?: (
    val: string,
    options: OptionType[]
  ) => OptionType | undefined;
}

export interface ChipSelectorOption<OptionType> {
  value: OptionType;
  isCancellable: boolean;
}

interface State<OptionType> {
  name?: string;
  suggestions: OptionType[];
  loading: boolean;
}

export class ChipSelector<OptionType> extends PureComponent<
  Props<OptionType>,
  State<OptionType>
> {
  static defaultProps = {
    debounceTime: 500
  };

  state: State<OptionType> = {
    suggestions: [],
    loading: false
  };

  onChange = async (val: string) => {
    const suggestions = await this.props.optionsQueryResolver(val);
    if (
      this.props.enableAddOption &&
      this.props.addOptionCreator &&
      this.props.addOptionCreator(val, suggestions)
    ) {
      // @ts-ignore
      suggestions.push(this.props.addOptionCreator(val, suggestions.slice(0)));
    }
    this.setState({ suggestions: suggestions || [] });
  };

  setLoading = (loading: boolean) => {
    this.setState({ loading });
  };

  onSelect = (val?: OptionType) => {
    this.props.onSelect(val, this.props.chips, this.setLoading);
  };

  render() {
    const {
      typeAheadProps,
      debounceTime,
      optionsLabelExtractor,
      chips,
      onChipRemove,
      chipClass,
      errorMessage,
      addOptionValueExtractor
    } = this.props;
    const { suggestions, loading } = this.state;
    return (
      <>
        <TypeAhead
          {...typeAheadProps}
          debounceTime={debounceTime}
          onSelect={this.onSelect}
          onChange={this.onChange}
          loading={loading}
          disabled={loading}
          valueExtractor={typeAheadProps.valueExtractor}
        >
          {suggestions.map((option: OptionType, index: number) => (
            <Option
              key={index}
              label={
                // @ts-ignore
                option.id === 0 && addOptionValueExtractor
                  ? addOptionValueExtractor(option)
                  : optionsLabelExtractor(option)
              }
              value={option}
            />
          ))}
        </TypeAhead>
        <div style={{ margin: "10px 0 10px 0" }}>
          {chips.map(
            (
              chip: { value: OptionType; isCancellable: boolean },
              index: number
            ) => (
              <Tag
                className={`${css({
                  marginRight: "10px",
                  marginBottom: "10px"
                })} ${chipClass}`}
                key={index}
                // @ts-ignore
                label={optionsLabelExtractor(chip.value)}
                onClose={
                  chip.isCancellable
                    ? () => {
                        onChipRemove(
                          chip.value,
                          chips.slice(0),
                          this.setLoading
                        );
                      }
                    : undefined
                }
                // @ts-ignore
                color={chip.value.isEditable ? "jade" : "violet"}
              />
            )
          )}
        </div>
        {!!errorMessage && (
          <div className={helperTextClassError}>{errorMessage}</div>
        )}
      </>
    );
  }
}
