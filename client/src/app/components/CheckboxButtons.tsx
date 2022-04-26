import {
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { FC, useState } from "react";

interface ICheckboxButtonsProps {
  title?: string;
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export const CheckboxButtons: FC<ICheckboxButtonsProps> = ({
  items,
  title,
  checked,
  onChange,
}) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];

    if (currentIndex === -1) {
      newChecked = [...checkedItems, value];
    } else {
      newChecked = checkedItems.filter((item) => item !== value);
    }

    setCheckedItems(newChecked); // local state change
    onChange(newChecked); // will be handled by the function that calls it
  }

  return (
    <>
      <FormGroup>
        {title && <FormLabel>{title}</FormLabel>}

        {items.map((item, index) => (
          <FormControlLabel
            key={item + index}
            control={
              <Checkbox
                checked={checkedItems.includes(item)}
                onClick={() => handleChecked(item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </>
  );
};
