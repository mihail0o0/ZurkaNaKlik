import { SyntheticEvent, useState } from "react";
import { Form } from "react-router-dom";
import Button from "@/components/lib/button";
import Input from "@/components/lib/inputs/text-input";

// import authAction from "../../actions/authAction";
import { userLoginSchema } from "@/utils/validators";
import { useUserLoginMutation } from "@/store/api/endpoints/auth";
import { LoginPayload } from "@/store/api/endpoints/auth/types";

const UserLoginForm = () => {
  const [emailText, setMailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [handleLogin] = useUserLoginMutation();

  const isValid = (loginData: LoginPayload): boolean => {
    setEmailError("");
    setPasswordError("");
    const valResult = userLoginSchema.validate(loginData);
    if (valResult.error) {
      setEmailError(null);
      setPasswordError(null);
      const errType = valResult?.error?.details[0].path[0];
      const errText = valResult?.error?.details[0].message;

      if (errType == "email") {
        setEmailError(errText);
      }
      if (errType == "password") {
        setPasswordError(errText);
      }
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const loginData: LoginPayload = {
      email: emailText,
      password: passwordText,
    };

    const valid = isValid(loginData);
    if (valid == false) return;

    await handleLogin(loginData);
  };

  return (
    <Form className="loginForm">
      <div className="formInputsWrapper">
        <Input
          onChange={setMailText}
          icon={"mail"}
          text={"Email"}
          error={emailError}
        />
        <Input
          onChange={setPasswordText}
          icon={"lock"}
          text={"Password"}
          suffixIcon={true}
          error={passwordError}
        />
      </div>
      <Button
        text={"Prijavi se"}
        onClick={handleSubmit}
        wide={true}
        center={true}
        paddingY={"16px"}
      />
    </Form>
  );
};

export default UserLoginForm;
