import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

export const ServerError = () => {
  const history = useHistory();
  const { state } = useLocation<any>();

  console.log(state);

  return (
    <Container
      component={Paper}
      sx={{
        textOverflow: "ellipsis",
        padding: 2,
      }}
    >
      {state?.error ? (
        <>
          <Typography variant="h3" gutterBottom color="error">
            {state.error?.title || "Server Error"}
          </Typography>
          <Divider />
          <Typography gutterBottom sx={{ marginTop: 2 }}>
            {state.error.detail || "Internal Server Error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={() => history.push("/catalog")}
          variant="contained"
          sx={{ marginLeft: "auto" }}
        >
          Go back to the store
        </Button>
      </Box>
    </Container>
  );
};
