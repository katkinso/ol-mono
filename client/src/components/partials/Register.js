import React, { useReducer } from "react";
import TextInput from '../ui/TextInput'
import PasswordInput from '../ui/PasswordInput'
import EmailInput from '../ui/EmailInput'
import EmailValidator from "email-validator";
import api from '../../api/api';
import { withRouter } from 'react-router-dom';


const Register = props => {
        
    const initalState =  {
        "formIsValid": false,
        "invalidFields": ["email","firstName","lastName","password"],
        "email": {
            "value": "",
            "allowEmpty": false,
            "isValid": false,
            "className": "form-control",
            "message": "",
            "messageClassName": "valid-feedback"
        },
        "firstName": {
            "value": "",
            "allowEmpty": false,
            "isValid": false,
            "className": "form-control",
            "message": "",
            "messageClassName": "valid-feedback"
        },
        "lastName": {
            "value": "",
            "allowEmpty": false,
            "isValid": false,
            "className": "form-control",
            "message": "",
            "messageClassName": "valid-feedback"
        },
        "password": {
            "value": "",
            "allowEmpty": false,
            "isValid": false,
            "className": "form-control",
            "message": "",
            "messageClassName": "valid-feedback"
        }
    }

    function reducer(state, {field, value, className, message, messageClassName, isValid, formIsValid, invalidFields}) {

        return {
                ...state,
                formIsValid,
                invalidFields,
                [field]:{
                    value,
                    className,
                    message,
                    messageClassName,
                    isValid
            }
        }
     }

 
     const onChange = (e) => {
        const value = e.target.value;
        const field = e.target.id;
        const type = e.target.type;
        updateField({type: type, field: field, value: value})
    }

    const onBlur = (e) => {
        const value = e.target.value;
        const field = e.target.id;
        const type = e.target.type;
        updateField({type: type, field: field, value: value})
    }

    const onFocus = (e) => {
        const value = e.target.value;
        const field = e.target.id;
        const type = e.target.type;
        updateField({type: type, field: field, value: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        api.register({
            "firstName": state.firstName.value,
            "lastName": state.lastName.value,
            "email": state.email.value,
            "password": state.password.value,
            "passwordConfirmation": state.password.value,
        }, (err, res) => {
            if (!err) {
                props.history.push('/dashboard')
            } else {
                // this.setState({
                //     error: "that's not right"
                // })

            }
        })
    }


    const updateField = (formField, formStatus) => {
        
        let isValid = true;
        let formIsValid = state.formIsValid;
        let message = 'Looks good!';
        

        switch(formField.field) {
            case 'email':
                isValid = EmailValidator.validate(formField.value);
                message = !isValid ? 'Email improperly formatted' : message;
            break;
            case 'password':
                isValid = formField.value.length > 5;
                message = !isValid ? 'Password must be 6 characters' : message;
                break;
            case 'firstName':
            case 'lastName':
                if (!state[formField.field].allowEmpty && formField.value === ''){
                    isValid = false;
                    message = !isValid && 'Field cannot be empty'
                }
            break;
            default:
          }

          let invalidFields = new Set(state.invalidFields)
          !isValid ? invalidFields.add(formField.field) : invalidFields.delete(formField.field)
          formIsValid = invalidFields.size === 0 ? true : false;
           
          dispatch({
                formIsValid: formIsValid,
                invalidFields: invalidFields,
                field: formField.field, 
                value: formField.value, 
                className: isValid ? 'form-control' : 'form-control is-invalid',
                message: message,
                messageClassName: isValid ? 'valid-feedback' : 'invalid-feedback',
                isValid: isValid
                })
    }


    const [state, dispatch] = useReducer(reducer, initalState);

    return (
        
            <form onSubmit={handleSubmit}>
                <h2 className="text-white text-center py-3">Sign up</h2>

                <EmailInput
                    id="email"
                    placeholder="Email"
                    className={state.email.className}
                    value={state.email.value} 
                    messageClassName={state.email.messageClassName}
                    message={state.email.message}
                    onChange={(e) => onChange(e)}
                    onBlur={(e) => onBlur(e)}
                    onFocus={(e) => onFocus(e)}
                />

               <TextInput
                    id="firstName"
                    className={state.firstName.className}
                    placeholder="First Name" 
                    value={state.firstName.value} 
                    messageClassName={state.firstName.messageClassName}
                    message={state.firstName.message}
                    onChange={(e) => onChange(e)}
                    onBlur={(e) => onBlur(e)}
                    onFocus={(e) => onFocus(e)}
                />

               <TextInput
                    id="lastName"
                    className={state.lastName.className}
                    placeholder="Last Name" 
                    value={state.lastName.value} 
                    messageClassName={state.lastName.messageClassName}
                    message={state.lastName.message}
                    onChange={(e) => onChange(e)}
                    onBlur={(e) => onBlur(e)}
                    onFocus={(e) => onFocus(e)}
                />
               
               <PasswordInput
                    id="password"
                    placeholder="Password"
                    className={state.password.className}
                    messageClassName={state.password.messageClassName}
                    message={state.password.message}
                    value={state.password.value}
                    onChange={(e) => onChange(e)}
                    onBlur={(e) => onBlur(e)}
                    onFocus={(e) => onFocus(e)}
                />

                <button 
                    type="submit"
                    id="submit"
                    className="btn btn-primary mt-3 w-100"
                    disabled={state.formIsValid ? '' : 'disabled'}
                >REGISTER</button>
            </form>
        )
};

// export default Register
export default withRouter(Register);


