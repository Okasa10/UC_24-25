import '../App.css'
export function DOB({ dob, setDob }) {
    function change(event) {
        setDob(event.target.value)
    }
    return (
        <div className="input-group mb-3 options">
            <span className="input-group-text bold" id="inputGroup-sizing-default" >
                Date of Birth
            </span>
            <input
                type="date"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                id="dob"
                value={dob}
                onChange={change}
            />
        </div>
    );

}