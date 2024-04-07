import { useState } from "react";
import { Form } from "react-router-dom";
import { FormInput, MainButton } from "../../common/commonComponents";
import authAction from '../../actions/authAction';
import { userLoginSchema } from "../../validators";

function UserLoginPage() {
    let actionRoute = 'Auth/login';
    const [emailText, setMailText] = useState('');
    const [passwordText, setPasswordText] = useState('');

    const [pending, setPending] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [cancelToken, setCancelToken] = useState(null);

    
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
            password: passwordText
        };

        try {
            // role = 1 odnosno obican korisnik
            let authResult = await authAction(actionRoute, userLoginSchema, payload, 1);
        }
        catch (error) {
            if (error.message == 'Validation Error') {
                console.log(error.type, error.error);
                if (error.type == 'email') setEmailError(error.error);
                else if (error.type == 'password') setPasswordError(error.error);
            }
        }


    };

    return (
        <Form className="loginForm" method="post" action={actionRoute}>
            <div className="formInputsWrapper">
                <FormInput onInputChange={handleMailTextChange} icon={"mail"} text={"Email"} error={emailError} />
                <FormInput onInputChange={handlePasswordTextChange} icon={"lock"} text={"Password"} suffixIcon={true} error={passwordError} />
            </div>
            <MainButton text={"Prijavi se"} onClick={submitHandler} wide={true} center={true} paddingY={"16px"} />

        </Form>
    );
}

export default UserLoginPage;