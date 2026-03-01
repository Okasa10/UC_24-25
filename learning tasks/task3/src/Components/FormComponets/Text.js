import '../App.css';
function Create({ text, id, placeholder, value, change }) {
    return (
        <div className="input-group mb-3 options">
            <span className="input-group-text bold" id="inputGroup-sizing-default">
                {text}
            </span>
            <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={change}
            />
        </div>

    );
}

export function Name({ name, setName }) {
    const changeName = (event) => {
        setName(event.target.value);
        // console.log(name);
    }
    return (
        <Create text="Full Name" id="name" placeholder="Enter your Name" value={name} change={changeName} />
    );
}


export function Email({ email, setEmail }) {
    const changeEmail = (event) => {
        setEmail(event.target.value);
    }
    return (
        <Create text="Email" id="email" placeholder="name@example.com" value={email} change={changeEmail} />
    );
}
export function Username({ username, setUsername }) {
    function changeUsername(event) {
        setUsername(event.target.value);
    }
    return (
        <Create text="Username" id="username" placeholder="" value={username}
            change={changeUsername} />
    );
}