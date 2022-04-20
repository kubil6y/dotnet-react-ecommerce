import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { agent } from "../../app/api/Agent";

interface IAboutPageProps {}

export const AboutPage: FC<IAboutPageProps> = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function handleGetNotFound() {
    agent.TestErrors.GetNotFound().catch((err) => console.log(err));
  }

  function handleGetBadRequest() {
    agent.TestErrors.GetBadRequest().catch((err) => console.log(err));
  }

  function handleGetUnauthorized() {
    agent.TestErrors.GetUnauthorized().catch((err) => console.log(err));
  }

  function handleGetValidationError() {
    agent.TestErrors.GetValidationError()
      .then(() => console.log("you should not see this message"))
      .catch((err) => setValidationErrors(err));
  }

  function handleGetServerError() {
    agent.TestErrors.GetServerError().catch((err) => console.log(err));
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={handleGetBadRequest} color="error">
          Test 400 Error
        </Button>

        <Button
          variant="contained"
          onClick={handleGetUnauthorized}
          color="error"
        >
          Test 401 Error
        </Button>

        <Button variant="contained" onClick={handleGetNotFound} color="error">
          Test 404 Error
        </Button>

        <Button
          variant="contained"
          onClick={handleGetServerError}
          color="error"
        >
          Test 500 Error
        </Button>

        <Button
          variant="contained"
          onClick={handleGetValidationError}
          color="error"
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((err, idx) => (
              <ListItem key={err + idx}>
                <ListItemText>{err}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
};
