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
import { useNavigate, Link } from "react-router-dom";

type RegistrationValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegistrationForm() {
  const navigate = useNavigate();

  const { control, register, handleSubmit } = useForm<RegistrationValues>();
  const classes = useStyles();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<RegistrationValues> = (dataForm) => {
    const { email, password } = dataForm;
    registration(email, password);
  };

  const registration = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });


      if (error) {
        throw new Error(error.message);
      }

      if (data) {

        // navigate("/login");
      }
      console.log('Data', data);
      // console.log('Error', error);


    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formInnerWrapper}>
        <h1 className={styles.h1}>Registration</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="email"
                id="outlined-basic"
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
                id="outlined-basic"
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
          <Controller
            control={control}
            name="confirmPassword"
            defaultValue={""}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="password"
                id="outlined-basic"
                label="Confirm the password"
                variant="outlined"
                {...register("confirmPassword", {
                  ...validationSchema.confirmPassword,
                })}
                value={value}
                onChange={onChange}
                helperText={errors.confirmPassword?.message}
                error={!!errors.confirmPassword?.message}
                className={classes.field}
              />
            )}
          />
          <Button className="self-end" type="submit" variant="contained">
            Submit
          </Button>
        </form>

        <div>
          <p className="mb-2 ">do you already have an account?</p>
          <Link to='/login'>
            <Button size="small" variant="contained" color="success">Go to login page</Button>
          </Link>

        </div>

      </div>

    </div>
  );
}
