import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FC } from "react";
import { ISortOption } from "../models";

interface IRadioButtonGroupProps {
  options: ISortOption[];
  onChange: (event: any) => void;
  selectedValue: string;
}

export const RadioButtonGroup: FC<IRadioButtonGroupProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ id, value, label }) => (
          <FormControlLabel
            key={id}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
