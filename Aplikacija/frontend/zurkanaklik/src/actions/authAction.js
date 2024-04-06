import { userLoginSchema, userRegisterSchema, agencyLoginSchema, agencyRegisterSchema } from "../validators";
let server = "https://localhost:7080/";

async function authAction(route, schema, payload) {
    let valResult = schema.validate(payload);

    if (valResult.error) {
        let valType = valResult?.error?.details[0].path[0];
        let valError = valResult?.error?.details[0].message;

        return [valType, valError];
    }

    try {
        // call backend funciton
        const response = await fetch(server + 'Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:payload.email,
                lozinka: payload.password
            })
        });

        if (!response.ok) throw Error('Network response is not ok');

        const resoult = response.json();

        console.log("Data sent", resoult);
    }
    catch (error) {
        throw new Error('Error sending data:', error);
    }



    return;
}

export default authAction;