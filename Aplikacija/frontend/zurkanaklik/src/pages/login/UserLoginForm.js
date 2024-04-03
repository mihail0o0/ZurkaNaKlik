import { useState } from "react";
import { Form } from "react-router-dom";
import { FormInput, MainButton } from "../../common/commonComponents";

function UserLoginPage() {
    const [emailText, setMailText] = useState('');
    const [passwordText, setPasswordText] = useState('');

    const handleMailTextChange = (newText) => {
        setMailText(newText);
    };

    const handlePasswordTextChange = (newText) => {
        setPasswordText(newText);
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <Form className="loginForm" method="post" action="/user/login">
            <div className="formInputsWrapper">
                <FormInput onInputChange={handleMailTextChange} icon={"mail"} text={"Email"} />
                <FormInput onInputChange={setPasswordText} icon={"lock"} text={"Password"} suffixIcon={true} />
            </div>
            <MainButton text={"Prijavi se"} onClick={submitHandler} wide={true} center={true} paddingY={"16px"} />

        </Form>
    );
}

export default UserLoginPage;