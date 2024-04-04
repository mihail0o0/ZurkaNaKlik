import { useState } from "react";
import { Form } from "react-router-dom";
import { FormInput, MainButton } from "../../common/commonComponents";
import authAction from '../../actions/authAction';
import { userLoginSchema } from "../../validators";

function UserLoginPage() {
    let actionRoute = '/user/login';
    const [emailText, setMailText] = useState('');
    const [passwordText, setPasswordText] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleMailTextChange = (newText) => {
        setMailText(newText);
    };

    const handlePasswordTextChange = (newText) => {
        setPasswordText(newText);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const payload = {
            email: emailText,
            password: passwordText
        };

        try {
            let authResult = await authAction(actionRoute, userLoginSchema, payload);
        }
        catch(error){
            console.log(error);

        }
        
        
    };

    return (
        <Form className="loginForm" method="post" action={actionRoute}>
            <div className="formInputsWrapper">
                <FormInput onInputChange={handleMailTextChange} icon={"mail"} text={"Email"} />
                <FormInput onInputChange={handlePasswordTextChange} icon={"lock"} text={"Password"} suffixIcon={true} />
            </div>
            <MainButton text={"Prijavi se"} onClick={submitHandler} wide={true} center={true} paddingY={"16px"} />

        </Form>
    );
}

export default UserLoginPage;