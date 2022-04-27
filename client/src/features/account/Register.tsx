import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { agent } from "../../app/api/Agent";
import { toast } from "react-toastify";

interface IRegisterProps {}

export const Register: FC<IRegisterProps> = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
  });

  function handleApiErrors(errors: any) {
    if (errors !== undefined) {
      errors.forEach((err: string) => {
        if (err.includes("Password")) {
          setError("password", { message: err });
        } else if (err.includes("Email")) {
          setError("email", { message: err });
        } else if (err.includes("Username")) {
          setError("username", { message: err });
        }
      });
    }
  }

  function submitForm(data: FieldValues) {
    agent.Account.Register(data)
      .then(() => {
        toast.success("Registration successful - you can now login");
        history.push("/login");
      })
      .catch((err) => handleApiErrors(err));
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
        Register
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
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
              message: "Not a valid email address",
            },
          })}
          error={Boolean(errors?.email)}
          helperText={errors?.email?.message}
          autoComplete="off"
        />

        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: "Password does not meet complexity requirements",
            },
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
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            Already have an account?{" "}
            <Link to="/login">Click here to login.</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
