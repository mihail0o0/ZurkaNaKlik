import { useState } from "react";
import { Form } from "react-router-dom";
import Button from "@/components/button"
import Input from "@/components/inputs/text-input";

import authAction from "../../actions/authAction";
import { userLoginSchema } from "../../validators";
import { useQuery, useMutation } from "@tanstack/react-query";

function UserLoginPage() {
  let actionRoute = "Auth/login";
  const [emailText, setMailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleMailTextChange = (newText) => {
    setMailText(newText);
  };

  const handlePasswordTextChange = (newText) => {
    setPasswordText(newText);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setEmailError();
    setPasswordError();

    const payload = {
      email: emailText,
      password: passwordText,
    };

    try {
      // role = 1 odnosno obican korisnik
      let authResult = await authAction(
        actionRoute,
        userLoginSchema,
        payload,
        1
      );
    } catch (error) {
      if (error.message == "Validation Error") {
        console.log(error.type, error.error);
        if (error.type == "email") setEmailError(error.error);
        else if (error.type == "password") setPasswordError(error.error);
      }
    }
  };

  return (
    <Form className="loginForm" method="post" action={actionRoute}>
      <div className="formInputsWrapper">
        <Input
          onChange={handleMailTextChange}
          icon={"mail"}
          text={"Email"}
          error={emailError}
        />
        <Input
          onChange={handlePasswordTextChange}
          icon={"lock"}
          text={"Password"}
          suffixIcon={true}
          error={passwordError}
        />
      </div>
      <Button
        text={"Prijavi se"}
        onClick={submitHandler}
        wide={true}
        center={true}
        paddingY={"16px"}
      />
    </Form>
  );
}

export default UserLoginPage;
