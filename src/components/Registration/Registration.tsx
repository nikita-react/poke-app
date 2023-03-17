import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validationSchema from "./Validation";
import { makeStyles } from '@mui/styles';
import styles from './styles.module.scss';
import supabase from "../../client";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};


const useStyles = makeStyles(() => ({
  field: {
    "& .MuiFormHelperText-root": {
      bottom: "0px",
      position: "absolute",
      transform: "translateY(100%)"
    }
  },
}));

export default function RegistrationForm() {
  const { control, register, handleSubmit } = useForm<FormValues>();
  const classes = useStyles();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<FormValues> = (dataForm) => {
    const { email, password } = dataForm;
    console.log(dataForm);

    sendingData(email, password);
  };

  const sendingData = async (email: string, password: string): Promise<void> => {

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      console.log('Data:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.h1}>Registration</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
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
              {...register("confirmPassword", { ...validationSchema.confirmPassword })}
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
    </div>
  );
}
