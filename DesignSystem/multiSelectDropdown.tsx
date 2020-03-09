import React from "react";
import { DropDown, OptionGroupCheckBox, Option } from "pebble-web";
import { dropDownClassName } from "./phoneInputStyles";
import { css } from "emotion";
import { AxiosPromise } from "axios";
import { IdNameMap } from "@actions/profile";
import { arrayUnique } from "@utils/arrayUnique";

interface Props<OptionType> {
  label: string;
  optionsQueryResolver?: (
    val: string
  ) => OptionType[] | Promise<OptionType[]> | AxiosPromise<IdNameMap[]>;
  selection: any[];
  onChange: (values: any[]) => void;
  className?: string;
  suggestions?: any[];
}

export const MultiSelectDropdown = (props: Props<any>) => {
  const { label, selection, className, optionsQueryResolver, onChange } = props;

  const [searchString, setString] = React.useState("");
  const [selected, setSelected] = React.useState<any[]>([]);
  const [suggestions, setSuggestions] = React.useState(props.suggestions || []);

  React.useEffect(() => {
    setSelected(selection);
  }, [selection.length]);

  const onQueryChange = async (val: string) => {
    if (optionsQueryResolver) {
      const newSuggestions = await optionsQueryResolver(val);
      const sgs = arrayUnique(
        selected.concat(newSuggestions),
        (a: any, b: any) => {
          if (a.id === b.id) {
            return true;
          }
          return false;
        }
      );
      setSuggestions(sgs.splice(0, 25));
    }
  };

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
          selection && selection.length ? `${selection.length} ` : ""
        } ${label}`}
        dropDownClassName={dropDownClassName}
      >
        {({ toggle }) => {
          return (
            <OptionGroupCheckBox
              searchBox={!!optionsQueryResolver}
              selected={selected}
              onChange={val => {
                setSelected(val);
              }}
              searchBoxProps={{
                placeholder: `Search ${label}`,
                onChange: v => {
                  setString(v);
                  onQueryChange(v);
                },
                value: searchString
              }}
              onApply={(value: any[]) => {
                onChange(value);
                toggle();
              }}
              onClear={() => {
                if (selection.length) {
                  onChange([]);
                }
                setSelected([]);
                toggle();
              }}
            >
              {arrayUnique(selected.concat(suggestions), (a: any, b: any) => {
                if (a.id === b.id) {
                  return true;
                }
                return false;
              }).map((option: any, index: number) => (
                <Option key={index} label={option.name} value={option} />
              ))}
            </OptionGroupCheckBox>
          );
        }}
      </DropDown>
    </div>
  );
};
