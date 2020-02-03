import React, { useReducer } from "react";
import PasswordInput from '../ui/PasswordInput'
import EmailInput from '../ui/EmailInput'
import EmailValidator from "email-validator";
import api from '../../api/api';
import { withRouter } from 'react-router-dom';

const Authenticate = props => {
        
    const initalState =  {
        "formIsValid": false,
        "invalidFields": ["email","password"],
        "email": {
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

            api.authenticate({
                "email": state.email.value,
                "password": state.password.value
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
                <h2 className="text-white text-center py-3">Login</h2>

                <EmailInput
                    id="email"
                    className={state.email.className}
                    placeholder="Email" 
                    value={state.email.value} 
                    messageClassName={state.email.messageClassName}
                    message={state.email.message}
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
                >LOG IN</button>
            </form>
        )
};

export default withRouter(Authenticate);
