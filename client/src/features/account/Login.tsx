import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/store";
import { loginAsync } from "./accountSlice";

interface ILoginProps {}

export const Login: FC<ILoginProps> = () => {
  const dispatch = useAppDispatch();

  // TODO defaultValues are for dev
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      username: "bob",
      password: "Pa$$w0rd",
    },
  });

  async function submitForm(data: FieldValues) {
    await dispatch(loginAsync(data));
  }

  return (
    <Container
      component={Paper}
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoFocus
          {...register("username", {
            required: "Username is required",
          })}
          error={Boolean(errors?.username)}
          helperText={errors?.username?.message}
          autoComplete="off"
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          error={Boolean(errors?.password)}
          helperText={errors?.password?.message}
          autoComplete="off"
        />
        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </LoadingButton>
        <Grid container>
          <Grid item>
            Don't have an account?{" "}
            <Link to="/register">Click here here register.</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
