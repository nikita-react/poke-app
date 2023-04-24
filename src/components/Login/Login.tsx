import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "../../styles/Form.module.scss";
import supabase from "../../client";
import validationSchema from "../../validators/auth";
import { useStyles } from "../../styles/InputUseStales";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createAuthToast from "../Toasts/authToast";
import Layout from "../Layout";

type LoginValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { control, register, handleSubmit } = useForm<LoginValues>();
  const classes = useStyles();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<LoginValues> = (dataForm) => {
    const { email, password } = dataForm;
    login(email, password);
  };

  const login = async (email: string, password: string): Promise<void> => {
    const toastId = createAuthToast();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        toast.update(toastId, {
          render: "Login Successful",
          type: "success",
          isLoading: false,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: (
          <>
            <p>Password or email is incorrect.</p>
          </>
        ),
        type: "error",
        isLoading: false,
      });
    }
  };

  return (
    <Layout styles={styles.formWrapper}>
      <ToastContainer />
      <div className={styles.formInnerWrapper}>
        <h1 className={styles.h1}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="email"
                id="email"
                label="Email"
                variant="outlined"
                {...register("email", { ...validationSchema.email })}
                value={value}
                onChange={onChange}
                helperText={errors.email?.message}
                error={!!errors.email?.message}
                className={classes.field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="password"
                id="password"
                label="Password"
                variant="outlined"
                {...register("password", { ...validationSchema.password })}
                value={value}
                onChange={onChange}
                helperText={errors.password?.message}
                error={!!errors.password?.message}
                className={classes.field}
              />
            )}
          />

          <Button className="self-end" type="submit" variant="contained">
            Sing in
          </Button>
        </form>
        <div>
          <p className="mb-2 ">don't have an account?</p>
          <Link to="/registration">
            <Button size="small" variant="contained" color="success">
              Go to registration page
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
