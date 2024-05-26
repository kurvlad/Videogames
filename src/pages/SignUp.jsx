import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { required, length } from "../utils/auth/validators.js";
import { setNewUser } from "../utils/auth/userData.js";
import { useNavigate } from "react-router-dom";
import { store } from "../store/store.js";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = store.getState().user.isAuthenticated;
    if (isAuth) {
      navigate("/");
    }
  }, [navigate]);

  const [state, setState] = useState({
    form: {
      login: {
        value: "",
        valid: false,
        error: null,
        message: null,
        validators: [required, length],
      },
      password: {
        value: "",
        valid: false,
        error: null,
        message: null,
        validators: [required, length],
      },
      passwordRepeat: {
        value: "",
        valid: false,
        error: null,
        message: null,
        validators: [required, length],
      },
    },
    commonMessage: null,
    passwordsSame: false,
    formIsValid: false,
  });

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    const input = e.target.id;

    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.form[input]?.validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.form,
        [input]: {
          ...prevState.form[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      let passwordsSame = false;
      for (const inputName in updatedForm) {
        passwordsSame = updatedForm.password.value === updatedForm.passwordRepeat.value ? true : false;
        formIsValid =
            formIsValid &&
            updatedForm[inputName]?.valid &&
            updatedForm.password.value === updatedForm.passwordRepeat.value;
      }

      return {
        form: updatedForm,
        passwordsSame,
        commonMessage: null,
        formIsValid: formIsValid,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setNewUser(state.form.login.value, state.form.password.value);
    navigate("/");
  };

  return (
      <div className="signin-section">
        <Box className="signin-section_form" component={"form"} autoComplete="off">
          <TextField
              onChange={inputChangeHandler}
              error={!!state.form.login.error}
              id="login"
              label="Login"
              helperText=""
              variant="filled"
              className="signin-section_form_input"
              autoComplete="true"
              sx={{ mb: 3 }}
          />
          <TextField
              onChange={inputChangeHandler}
              error={!!state.form.password.error}
              id="password"
              label="Password"
              helperText=""
              variant="filled"
              className="signin-section_form_input"
              type="password"
              autoComplete="false"
              sx={{ mb: 3 }}
          />
          <TextField
              onChange={inputChangeHandler}
              error={!!state.form.password.error}
              id="passwordRepeat"
              label="Password repeat"
              helperText=""
              variant="filled"
              className="signin-section_form_input"
              type="password"
              autoComplete="false"
          />
          <Button
              onClick={submitHandler}
              disabled={!state.formIsValid}
              variant={state.formIsValid ? "contained" : "outlined"}
              sx={{ mt: 3 }}
          >
            Регистрация
          </Button>
        </Box>
      </div>
  );
}