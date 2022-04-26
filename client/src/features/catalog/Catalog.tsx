import {
  getFiltersAsync,
  getProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import {
  AppPagination,
  CheckboxButtons,
  RadioButtonGroup,
} from "../../app/components";
import { Grid, Paper } from "@mui/material";
import { FC, useEffect } from "react";
import { LoadingComponent } from "../../app/layout";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { ProductList } from "./ProductList";
import { ProductSearch } from "./ProductSearch";
import { ISortOption } from "../../app/models";

interface ICatalogProps {}

const paperStyles = {
  marginBottom: 2,
  padding: 2,
};

// these options match our API
const sortOptions: ISortOption[] = [
  { id: 1, value: "name", label: "Alphabetical" },
  { id: 2, value: "priceDesc", label: "Price - High to low" },
  { id: 3, value: "price", label: "Price - Low to high" },
];

export const Catalog: FC<ICatalogProps> = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(getProductsAsync());
    }
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(getFiltersAsync());
    }
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) {
    return <LoadingComponent message="Loading products..." />;
  }

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ marginBottom: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={paperStyles}>
          <RadioButtonGroup
            options={sortOptions}
            selectedValue={productParams.orderBy}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>

        {/* Brands Checkbox */}
        <Paper sx={paperStyles}>
          <CheckboxButtons
            items={brands}
            title="Brands"
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>

        {/* Types Checkbox */}
        <Paper sx={paperStyles}>
          <CheckboxButtons
            items={types}
            title="Types"
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>

      <Grid item xs={3}></Grid>
      <Grid item xs={9} sx={{ marginBottom: 2 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => {
              if (metaData.currentPage === page) return;
              dispatch(setPageNumber(page));
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};
