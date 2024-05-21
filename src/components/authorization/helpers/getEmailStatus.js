export const getEmailStatus = (value) => {
    const isEmailValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
    return { isEmailValid:isEmailValid };
}