import '../App.css'

export function Create({ text, message, id, value, change, bg }) {
    const { color } = bg;
    return (
        <form className="options">
            <label htmlFor="inputPassword5" className="form-label bold password " style={{
                backgroundColor: 'transparent', boxShadow: 'none', color: color
            }}>{text}</label>
            <input type="password" id={id} className="form-control" aria-describedby="passwordHelpBlock" value={value} onChange={change} />
            <div className="form-text" style={{
                background: 'transparent', boxShadow: 'none', color: color
            }} >{message}
            </div>
        </form>
    );
}

export function Password({ pass, setPass, bg }) {
    const changePass = (event) => {
        setPass(event.target.value);
    }

    return (
        <Create text="Password" message="Your password must be 8-20 characters long. Contains at least one uppercase letter, one lowercase letter, and one number and also a special character and must not contain spaces or emoji."
            id="pass" value={pass} change={changePass} bg={bg} />
    );
}
export function ConfirmPassword({ confirmPass, setConfirmPass, bg }) {
    const changeConfirm = (event) => {
        setConfirmPass(event.target.value);
    }
    return (

        <Create text="Confirm Password" message="Re-Enter your password"
            id="confirmPass" value={confirmPass} change={changeConfirm} bg={bg} />
    );
}