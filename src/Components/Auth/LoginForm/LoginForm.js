import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  // console.log(user);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(response => {
          setUser(response.user);
          setUserActive(response.user.emailVerified);
          if (!response.user.emailVerified) {
            toast.warning(
              "Please verify the account before trying to log in."
            );
          }
        })
        .catch(err => {
          handlerErrors(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="login-form">
      <h1>Spanish courses for all</h1>

      <Form onSubmit={onSubmit} onChange={onChange} className="login">
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="email"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Please give a valid email.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            error={formError.password}
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
          />
          {formError.password && (
            <span className="error-text">
              Please insert a password greater than 5 characters.
            </span>
          )}
        </Form.Field>
        <Button className="login " type="submit" loading={isLoading}>
          Log in
        </Button>
        <Button className="change " type="submit" onClick={() => setSelectedForm("reset")}>
          Forgot password?
        </Button>
      </Form>

      {!userActive && (
        <ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}

      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>Back</p>
        <p>
          I don't have a Comligo account{" "}
          <span onClick={() => setSelectedForm("register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

function ButtonResetSendEmailVerification(props) {
  const { user, setIsLoading, setUserActive } = props;

  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("Verification email sent.");
      })
      .catch(err => {
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        setUserActive(true);
      });
  };

  return (
    <div className="resend-verification-email">
      <p>
        Resend verification email.
        <span onClick={resendVerificationEmail}>{` `}click here.</span>
      </p>
    </div>
  );
}

function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("Username or password is wrong. Please try again.");
      break;
    case "auth/too-many-requests":
      toast.warning(
        "The number of requests exceeded. Please try another way to log in."
      );
      break;
    case "auth/user-not-found":
      toast.warning("User or password is wrong. Please verify.");
      break;
    default:
      break;
  }
}

function defaultValueForm() {
  return {
    email: "",
    password: ""
  };
}