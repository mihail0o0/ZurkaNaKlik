import { useState } from "react";
import { Form } from "react-router-dom";
import Button from "@/components/button"
import Input from "@/components/inputs/text-input";

// import authAction from "../../actions/authAction";
import { userLoginSchema } from "@/utils/validators";

function UserLoginPage() {
  let actionRoute = "Auth/login";
  const [emailText, setMailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleMailTextChange = (newText: string) => {
    setMailText(newText);
  };

  const handlePasswordTextChange = (newText: string) => {
    setPasswordText(newText);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
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
