import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

type ControllerProps = {
  control: any;
  register: any;
  name: string;
  label: string;
  validationSchema: any;
  errors: any;
  classes: any;
  defaultValue: string
};

const MUITextInput: React.FC<ControllerProps> = ({
  control,
  register,
  name,
  label,
  validationSchema,
  errors,
  classes,
  defaultValue
}) => {

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <TextField
          type={(name === "confirmPassword") ? "password" : (name ? name : "text")}
          id={name}
          label={label}
          variant="outlined"
          {...register(name, { ...validationSchema[name] })}
          value={value}
          onChange={onChange}
          helperText={errors[name]?.message}
          error={!!errors[name]?.message}
          className={classes.field}
        />
      )}
    />
  );
};

export default MUITextInput;
