import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container component={Paper} sx={{ padding: 4 }}>
      <Typography variant="h4" color="error" textAlign="center" gutterBottom>
        Not Found - 404
      </Typography>

      <Typography textAlign="center">
        Sorry We couldn't find what are you looking for.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Button variant="contained" component={Link} to="/catalog">
          Go back to the store
        </Button>
      </Box>
    </Container>
  );
};
