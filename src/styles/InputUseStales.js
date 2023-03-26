import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  field: {
    "& .MuiFormHelperText-root": {
      bottom: "0px",
      position: "absolute",
      transform: "translateY(100%)",
    },
  },
}));
