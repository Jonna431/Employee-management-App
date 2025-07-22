import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({
  name,
  label,
  register,
  error,
  type = "text",
  children,
  ...rest
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
      {...rest}
    >
      {children}
    </TextField>
  );
};

export default CustomTextField;
