import './index.scss'

const AuthButton = ({text, type="submit"}) => {
    return <button
        className="authButton"
        type={type}
    >
        {text}
    </button>
}

export default AuthButton;