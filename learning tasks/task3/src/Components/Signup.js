
import axios from 'axios';
// importing all the componenets of the form
import Navbar from './FormComponets/Navbar';
import { Name, Email, Username } from './FormComponets/Text.js'
import { Password, ConfirmPassword } from './FormComponets/Password.js';
import { DOB } from './FormComponets/Date.js';
import { Phone } from './FormComponets/Phone.js';
import { useState, useContext } from 'react';
import { Slide, Bounce, toast, ToastContainer } from 'react-toastify';
import { BgContext } from '../App.js';
import { useNavigate } from 'react-router-dom';


// all the form components are in this finction
export function FormComponent() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [dob, setDob] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");

    //made to navigate to another file
    const navigate = useNavigate();

    const { bg, obg, setBg, setobg } = useContext(BgContext);
    const [isSubmitting, setIsSubmitting] = useState(false);


    //toast use karne ke liye
    const Emit = (text) => {
        return (
            toast.warn((text), {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            }
            ))
    }

    const clearFields = () => {
        setName("");
        setConfirmPass("");
        setDob("");
        setEmail("");
        setPass("");
        setUsername("");
        setPhone("");
    }

    // checking all the requirements are fulfilled before submiting the form
    const Validate = () => {
        // checking if all fields are filled
        if (!name || !email || !pass || !confirmPass || !dob || !phone) {
            return toast.warn('Fill all the required details!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        else if ((!name.match(/^[a-zA-Z\s'-]{8,20}$/)) ||
            (!email.match(/([a-zA-Z0-9_\-.]+[@][a-zA-Z]+[.]{1}[a-z]{2,3})/)) ||
            (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\S])(?!.*\s).{8,20}$/)) ||
            (confirmPass !== pass)) {

            if (!name.match(/^[a-zA-Z\s'-]{8,20}$/)) {
                Emit('The name must be Minimum 8 letters and Maximum 20 letters')
            }


            if (!email.match(/^([a-zA-Z0-9_\-.]+[@]{1}[a-zA-Z]+[.]{1}[a-z]{2,3})$/)) {
                Emit('Enter the email in Standard format');
            }


            if (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\S])(?!.*\s).{8,20}/)) {
                Emit('The password must contain all the specified fields')
            }


            if (confirmPass !== pass) {
                toast.error('The confirm password must match the entered password', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        }
        else {
            setIsSubmitting(true);
            toast.success('Congratulations!! Your form was successfully submitted', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            //sending the user data to the server
            axios.post('https://auth-backend-138t.onrender.com/api/v1/users/register', {
                "username": `${username}`,
                "fullName": `${name}`,
                "email": `${email}`,
                "password": `${pass}`,
                "phone": `${phone}`,
                "dob": `${dob}`
            }
            )
                .then(function (response) {

                    clearFields();
                })
                .catch(function (error) {

                    if (error.response && error.response.status === 409) {
                        toast.error('User already exists. Please try logging in.');
                    } else {
                        toast.error('An error occurred. Please try again.');
                    }

                });
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 4000);
        }

    };

    //making extra already signed up btn 
    function LoggedIn() {
        return (
            <button type="button" className='btn btn-primary' onClick={loggedIn}>Already Signed Up</button>
        )
    }

    const loggedIn = () => {
        setTimeout(() => {
            navigate("/login", { replace: true });
        }, 1000);
    }

    return (
        <>
            <ToastContainer />
            <Navbar setBg={setBg} setobg={setobg} title="SignUp Form" extra={<LoggedIn />} />
            <div style={obg} className='py-5'>
                <div className='Box container' style={bg}>
                    <Name name={name} setName={setName} />
                    <Email email={email} setEmail={setEmail} />
                    <Username username={username} setUsername={setUsername} />
                    <Password pass={pass} setPass={setPass} bg={bg} />
                    <ConfirmPassword confirmPass={confirmPass} setConfirmPass={setConfirmPass} bg={bg} />
                    <DOB dob={dob} setDob={setDob} />
                    <Phone phone={phone} setPhone={setPhone} />
                    <button type="button" className="btn btn-secondary my-4" onClick={Validate} disabled={isSubmitting}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}
