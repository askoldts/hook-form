const FieldValidationStatus = ({ field, validationBy, text }) => {
    return <div className={field ? (validationBy ? 'success' : 'error') : 'default'}>{text}</div>
}

export default FieldValidationStatus;