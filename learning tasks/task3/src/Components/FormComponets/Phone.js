import '../App.css';

export function Phone({ phone, setPhone }) {


    const enterNumber = (event) => {
        setPhone(event.target.value)
    }

    return (
        <div className="input-group mb-3 options">
            <span className="input-group-text bold" id="inputGroup-sizing-default">
                Phone No.
            </span>
            <input
                type="number"
                value={phone}
                onChange={enterNumber}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                id="phone"
                maxLength="10"
            />
        </div>
    );

}

