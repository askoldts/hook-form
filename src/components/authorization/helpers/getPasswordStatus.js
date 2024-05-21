export const getPasswordStatus = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasValidLength = /^.{8,}$/.test(value);
    const hasNoSpaces = /^\S*$/.test(value);

    return {
        hasValidLength: hasValidLength && hasNoSpaces,
        hasUpperCase: hasUpperCase ,
        hasNumber: hasNumber
    };
};