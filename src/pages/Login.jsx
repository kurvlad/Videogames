import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Login.css";
import { required, length } from "../utils/auth/validators.js";
import {checkAuthData, initUser, setUser} from "../utils/auth/userData.js";
import { store } from "../store/store.js";
import {getUserSessionData} from "../utils/dataStorage/user";
import {initHistory} from "../store/historySlice";
import {setFavorites} from "../store/favoriteSlice";

export default function Login() {
  const navigate = useNavigate();

/*  useEffect(() => {
    const isAuth = store.getState().user.isAuthenticated;
    if (isAuth) {
      navigate("/");
    }
  }, [navigate]);*/

  useEffect(() => {
    if (store.getState().user.isAuthenticated) {
      navigate("/");
      return;
    }
    const userData = getUserSessionData();
    if (userData?.user.login && userData?.user.password) {
      initUser(userData);
      initHistory(userData.history);
      setFavorites(userData.favorites);

      navigate("/");
    }
  }, []);

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
    },
    commonMessage: null,
    formIsValid: false,
  });

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    const input = e.target.id;

    return setState((prevState) => {
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
          error: null,
          message: null,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName]?.valid;
      }

      return {
        form: updatedForm,
        commonMessage: null,
        formIsValid: formIsValid,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const attempt = checkAuthData(state.form.login.value, state.form.password.value);
    if (attempt.ok) {
      setUser(state.form.login.value, state.form.password.value);
      // navigate("/");
    } else {
      const { input, message } = attempt;
      if (attempt.input) {
        setState((prev) => {
          return {
            ...prev,
            form: {
              ...prev.form,
              [input]: { ...prev.form[input], error: true, message },
            },
          };
        });
      } else {
        setState((prev) => {
          return { ...prev, commonMessage: message };
        });
      }
    }
  };

  return (
    <div className="signin-section">
      <Box className="signin-section_form" component={"form"} autoComplete="off">
        {state.commonMessage && <span className="signin-section_popupMessage">{state.commonMessage} </span>}
        <TextField
          onChange={inputChangeHandler}
          error={!!state.form.login.error}
          id="login"
          label="Login"
          helperText={state.form.login.message}
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
          helperText={state.form.password.message}
          variant="filled"
          className="signin-section_form_input"
          type="password"
          autoComplete="false"
        />
        <Button
          type="submit"
          onClick={submitHandler}
          disabled={!state.formIsValid}
          variant={state.formIsValid ? "contained" : "outlined"}
          sx={{ mt: 3 }}
        >
          Войти
        </Button>
      </Box>
    </div>
  );
}
