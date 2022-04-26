import { debounce, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setProductParams } from "./catalogSlice";

interface IProductSearchProps {}

export const ProductSearch: FC<IProductSearchProps> = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((e: any) => {
    dispatch(setProductParams({ searchTerm: e.target.value }));
  }, 1000);

  function handleOnChange(e: any) {
    setSearchTerm(e.target.value);
    debouncedSearch(e);
  }

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleOnChange}
    />
  );
};
