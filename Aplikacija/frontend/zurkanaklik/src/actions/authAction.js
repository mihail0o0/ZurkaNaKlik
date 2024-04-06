import { userLoginSchema, userRegisterSchema, agencyLoginSchema, agencyRegisterSchema } from "../validators";

async function authAction(route, schema, payload) {
    let valResult = schema.validate(payload);


    if (valResult.error) {
        let valType = valResult?.error?.details[0].path[0];
        let valError = valResult?.error?.details[0].message;
        
        return [valType, valError];
    }
    
    // call backend funciton

    


    return;
}

export default authAction;