import { useForm } from "react-hook-form"
import {useState} from "react";
import './components/index.scss'
import FieldValidationStatus from "./components/authorization/fieldValidationStatus/FieldValidationStatus.jsx";
import AuthButton from "./components/authorization/authButton/AuthButton.jsx";
import {getPasswordStatus} from "./components/authorization/helpers/getPasswordStatus.js";
import {getEmailStatus} from "./components/authorization/helpers/getEmailStatus.js";
import {
    EMAIL_IS_EMPTY,
    EMAIL_VALIDATION_INVALID,
    PASSWORD_IS_EMPTY,
    PASSWORD_VALIDATION_INVALID
} from "./components/authorization/error_constants.js";

const App = () => {
    const {
        register,
        handleSubmit,
        watch
    } = useForm();
    const password = watch('password', '');
    const passwordStatus = getPasswordStatus(password);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [fieldsValid, setFieldsValid] = useState({
        email:false,
        password: false
    });
    const onSubmit = (data) => {
        setFieldsValid({
            email:true,
            password: true
        });
        console.log(data, "DATA");
    }

    const onError = (data) => {
        if([PASSWORD_VALIDATION_INVALID, PASSWORD_IS_EMPTY].includes(data.password?.message)) setPasswordError(PASSWORD_VALIDATION_INVALID);
        if([EMAIL_VALIDATION_INVALID, EMAIL_IS_EMPTY].includes(data.email?.message)) setEmailError(EMAIL_VALIDATION_INVALID);
        if(!data.email?.message) {
            setFieldsValid((prevState) => ({...prevState, email: true}));
        }
        if(!data.password?.message) {
            setFieldsValid((prevState) => ({...prevState, password: true}));
        }
    }

    const onChangeHandler = (fieldError, setStateError, authorizationField) => {
      fieldError.length && setStateError('');
      setFieldsValid((prevState) => ({...prevState, [authorizationField]: false}))
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <div className="innerWrapper">
                <div className="innerWrapper-title">Sign Up</div>
            <div className="input-column">
                <input
                    type="email"
                    {...register('email', {
                        required: EMAIL_IS_EMPTY,
                        validate: value => {
                            const { isEmailValid } = getEmailStatus(value);

                            if(!isEmailValid) {
                                return EMAIL_VALIDATION_INVALID;
                            }

                            return true;
                        },
                        onChange: () => onChangeHandler(emailError, setEmailError, "email")
                    })}
                    aria-invalid={fieldsValid.email ? "success" : emailError.length ? "true"  : "false"}
                />

                <input
                    type="password"
                    {...register('password', {
                        required: PASSWORD_IS_EMPTY,
                        validate: value => {
                            const { hasValidLength, hasUpperCase, hasNumber } = getPasswordStatus(value);

                            if (!hasValidLength || !hasUpperCase || !hasNumber) {
                                return PASSWORD_VALIDATION_INVALID;
                            }

                            return true;
                        },
                        onChange: () => onChangeHandler(passwordError, setPasswordError, "password")
                    })}
                    aria-invalid={fieldsValid.password ? "success" : passwordError.length  ? "true" : "false"}
                />
            </div>

            <div className="passwordValidationStatus">
                {!passwordError && <>
                    <FieldValidationStatus
                        field={password}
                        validationBy={passwordStatus.hasValidLength}
                        text="8 characters or more (no spaces)"
                    />
                    <FieldValidationStatus
                        field={password}
                        validationBy={passwordStatus.hasUpperCase}
                        text="1 uppercase letters"
                    />
                    <FieldValidationStatus
                        field={password}
                        validationBy={passwordStatus.hasNumber}
                        text="At least one digit"
                    />
                </>}
                {passwordError && <div className="error">{passwordError}</div>}
            </div>

            <AuthButton
                text="Sign Up"
            />

            </div>
        </form>
  )
}



export default App
