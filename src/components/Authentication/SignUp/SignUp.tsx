import {
  useForm,
  SubmitHandler,
  useFormState,
} from "react-hook-form";
import Button from "@mui/material/Button";
import styles from '../../../styles/Form.module.scss';
import supabase from "../../../client";
import validationSchema from "../../../validators/auth";
import { useStyles } from "../../../styles/InputUseStyles";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createAuthToast from "../../Toasts/authToast";
import Layout from "../../Layout";
import MUITextInput from "../../MUIComponents/MUITextInput";

type RegistrationValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
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
    const toastId = createAuthToast();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        toast.update(toastId, {
          render: "Registration Successful",
          type: "success",
          isLoading: false,
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      toast.update(toastId, {
        render: (
          <>
            <p>This email already exists </p>
            <Link to="/login" className="text-blue-600 ">
              go to login page
            </Link>
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
        <h1 className={styles.h1}>Sign up</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <MUITextInput
            control={control}
            register={register}
            name="email"
            label="Email"
            validationSchema={validationSchema}
            errors={errors}
            classes={classes}
            defaultValue=""
          />
          <MUITextInput
            control={control}
            register={register}
            name="password"
            label="Password"
            validationSchema={validationSchema}
            errors={errors}
            classes={classes}
            defaultValue=""
          />
          <MUITextInput
            control={control}
            register={register}
            name="confirmPassword"
            label="Confirm the password"
            validationSchema={validationSchema}
            errors={errors}
            classes={classes}
            defaultValue=""
          />

          <Button className="self-end" type="submit" variant="contained">
            Create an account
          </Button>
        </form>

        <div>
          <p className="mb-2 ">do you already have an account?</p>
          <Link to="/login">
            <Button size="small" variant="contained" color="success">
              Go to "sign in" page
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
