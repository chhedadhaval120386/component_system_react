import { PureComponent } from "react";
import { DropDown, OptionGroupRadio, Option } from "pebble-web";
import { dropDownClassName } from "./phoneInputStyles";
import { css } from "emotion";
import { AxiosPromise } from "axios";
import { IdNameMap } from "@actions/profile";

interface Props<OptionType> {
  label: string;
  optionsQueryResolver?: (
    val: string
  ) => OptionType[] | Promise<OptionType[]> | AxiosPromise<IdNameMap[]>;
  selection: any;
  onChange: (value: any) => void;
  className?: string;
  suggestions?: any[];
  defaultOption?: OptionType | IdNameMap;
}

interface State {
  searchString: string;
  suggestions: any[];
  selected: any[];
  updatedFromProps?: string;
  isChangedManually: boolean;
}

export class SingleSelectDropdown<OptionType> extends PureComponent<
  Props<OptionType>
> {
  state: State = {
    searchString: "",
    suggestions: this.props.suggestions || [],
    selected: [],
    isChangedManually: false
  };

  componentDidUpdate(prevProps: any) {
    const { suggestions } = prevProps;
    const { suggestions: newSuggestions } = this.props;
    if (suggestions.length !== newSuggestions) {
      this.setState({
        suggestions
      });
    }
  }

  static getDerivedStateFromProps(props: any, state: State) {
    if (
      props.selection &&
      JSON.stringify(state.updatedFromProps) !==
        JSON.stringify(props.selection) &&
      !!props.optionsQueryResolver
    ) {
      const { selection } = props;
      const { suggestions } = state;
      const sgs = (selection ? [selection] : []).concat(
        (suggestions || []).filter(
          (sg: any) =>
            !(selection ? [selection] : []).find(
              (slc: any) => slc.name === sg.name
            )
        )
      );
      // const sltd = selected.concat((selection || []).filter((sg: any) => (!selected.find((slc: any) => (slc.name === sg.name)))));
      return {
        ...state,
        suggestions: sgs.splice(0, 25),
        updatedFromProps: props.selection
      };
    }
    return { ...state };
  }

  onQueryChange = async (val: string) => {
    const { selection, optionsQueryResolver } = this.props;
    if (optionsQueryResolver) {
      const suggestions = await optionsQueryResolver(val);
      const sgs = (selection ? [selection] : []).concat(suggestions);
      // @ts-ignore
      this.setState({
        suggestions: sgs.splice(0, 25),
        isChangedManually: false
      });
    }
  };

  render() {
    const {
      label,
      selection,
      className,
      optionsQueryResolver,
      defaultOption
    } = this.props;

    const { searchString, suggestions, selected } = this.state;

    return (
      <div
        className={`${className} ${css({
          display: "inline-flex",
          marginBottom: "15px",
          marginRight: "15px"
        })}`}
      >
        <DropDown
          buttonLabel={`${
            selection && selection.name ? selection.name : ""
          } ${label}`}
          dropDownClassName={dropDownClassName}
          placement="bottom-end"
        >
          {({ toggle }) => {
            return (
              <OptionGroupRadio
                searchBox={!!optionsQueryResolver}
                selected={selected || selection}
                onChange={(val?: any) => {
                  const value = val || defaultOption;
                  this.setState({ selected: value }, () => {
                    // @ts-ignore
                    this.props.onChange(value ? [value] : []);
                    toggle();
                  });
                }}
                searchBoxProps={{
                  placeholder: `Search ${label}`,
                  onChange: v => {
                    this.setState({ searchString: v });
                    this.onQueryChange(v);
                  },
                  value: searchString
                }}
              >
                {suggestions.map((option: any, index: number) => (
                  <Option key={index} label={option.name} value={option} />
                ))}
              </OptionGroupRadio>
            );
          }}
        </DropDown>
      </div>
    );
  }
}
