import { userLoginSchema, userRegisterSchema, agencyLoginSchema, agencyRegisterSchema } from "../validators";
import { AuthError } from "../errors"

let server = "https://localhost:7080/";

// formatira objekat sa podacima da bude u formatu kao na serveru
function formatPayload(route, payload, role) {
    payload.role = role;

    return {
        ime: payload.name,
        prezime: payload.lastName,
        email: payload.email,
        brTel: payload.phoneNumber,
        lozinka: payload.password,
        role: payload.role
    };
}

// handle pending state, stop request, etc...
async function authAction(route, schema, payload, role) {
    const valResult = schema.validate(payload);
    const formatedPayload = formatPayload(route, payload, role);

    if (valResult.error) {
        let valType = valResult?.error?.details[0].path[0];
        let valError = valResult?.error?.details[0].message;

        throw new AuthError('Validation Error', valType, valError);
    }

    try {
        // call backend funciton
        const response = await fetch(server + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formatedPayload)
        });

        if (!response.ok) throw Error('Network response is not ok');

        const resoult = response.json();

        console.log('Resoult', resoult);
    }
    catch (error) {
        throw new Error('Error in network request:', error);
    }



    return;
}

export default authAction;