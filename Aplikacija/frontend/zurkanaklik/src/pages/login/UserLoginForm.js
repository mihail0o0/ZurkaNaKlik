import { Form } from "react-router-dom";
import { FormInput, MainButton } from "../../common/commonComponents";

function UserLoginPage() {
    return (
        <Form className="loginForm" method="post" action="/user/login">
            <div className="formInputsWrapper">
                <FormInput icon={"mail"} text={"Email"} />
                <FormInput icon={"lock"} text={"Password"} suffixIcon={true} />
            </div>
            <MainButton text={"Prijavi se"} wide={true} center={true} paddingY={"16px"} />

        </Form>
    );
}

export default UserLoginPage;