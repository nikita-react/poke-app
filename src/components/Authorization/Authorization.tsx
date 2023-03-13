import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validationSchema from "./Validation";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { control, register, handleSubmit } = useForm<FormValues>();

  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen px-5 mx-auto">
      <form
        className="flex flex-col w-full max-w-xs gap-3 "
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
