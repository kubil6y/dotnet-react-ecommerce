import { Box, Typography, Pagination } from "@mui/material";
import { FC } from "react";
import { IMetaData } from "../models";

interface IAppPaginationProps {
  metaData: IMetaData;
  onPageChange: (page: number) => void;
}

export const AppPagination: FC<IAppPaginationProps> = ({
  metaData: { currentPage, pageSize, totalPages, totalCount },
  onPageChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
      />
    </Box>
  );
};
