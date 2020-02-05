import validator from "email-validator";

const email = (e) => {
    const value = e.target.value;
    if (!validator.validate(value)){
        return "Email must be properly formatted"
    }
   
}

const password = (password) => {
    return password.length >= 6 ? true : false;
}


// export  { validateFormFields }
export default { password, email }