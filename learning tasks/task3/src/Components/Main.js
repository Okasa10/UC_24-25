import { Routes, Route } from 'react-router-dom';
import React, { useContext, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './FormComponets/Navbar.js';
import { BgContext } from '../App.js'
import { AuthContext } from './Auth.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Create } from './FormComponets/Password.js';
import { Name, Email, Username } from './FormComponets/Text.js';
import { DOB } from './FormComponets/Date.js';
import { Phone } from './FormComponets/Phone.js';
import ProtectedRoute from './ProtectedRoute.js';



// comp to set the output when view profile is clicked
function UserInfo({ output }) {
    return (
        <div>
            <p>Username: {output.username}</p>
            <p>Name: {output.fullName}</p>
            <p>Email: {output.email}</p>
            <p>DOB: {output.dob}</p>
            <p>Phone No: {output.phone}</p>
        </div>
    )
}


// component to Change PAssword
function ChangeLogic() {
    const { bg } = useContext(BgContext);

    const [oldpass, setOldPass] = useState("");
    const [newpass, setNewPass] = useState("");
    const [cnewpass, setCPass] = useState("");
    const changeOldPass = (event) => {
        setOldPass(event.target.value);
    }
    const changeNewPass = (event) => {
        setNewPass(event.target.value);
    }
    const changeCPass = (event) => {
        setCPass(event.target.value);
    }

    const submitPass = () => {

        if (!newpass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\S])(?!.*\s).{8,20}/)) {
            toast.warn('The password must contain all the specified fields');
            return;
        }
        if (cnewpass !== newpass) {
            toast.warn('The confirm password must match the entered password');
            return;
        }

        axios.post('https://auth-backend-138t.onrender.com/api/v1/users/change-password', {
            "oldPassword": `${oldpass}`,
            "newPassword": `${newpass}`,
            "confirmPassword": `${cnewpass}`
        },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authtoken')}`
                }
            }).then((res) => {
                if (res.status === 200) {
                    toast.success("Password updated succesfully")
                }
                else throw new Error("")
            }).catch((err) => {
                toast.error("WRONG CURRENT PASSOWRD");
            })

    }


    return (
        <div className='container'>
            <Create text="Old Password" message="Enter your old password."
                id="oldPass" value={oldpass} change={changeOldPass} bg={bg} />
            <Create text="New Password" message="Enter your new password."
                id="newPass" value={newpass} change={changeNewPass} bg={bg} />
            <Create text="Confirm Password" message="Confirm your password."
                id="ConNewPass" value={cnewpass} change={changeCPass} bg={bg} />
            <button className='btn btn-primary my-5' onClick={submitPass}>Submit</button>
        </div>
    )
}

// comp to update user details
function Update() {
    const { bg, obg } = useContext(BgContext)

    const [newName, setnewName] = useState("");
    const [newEmail, setnewEmail] = useState("");
    const [newdob, setnewDob] = useState("");
    const [newUsername, setnewUsername] = useState("");
    const [newPhone, setnewPhone] = useState("");


    const updateDetails = () => {
        if (!newName || !newEmail || !newdob || !newPhone) {
            return toast.warn('Fill all the required details!');
        }
        else if ((!newName.match(/^[a-zA-Z\s'-]{8,20}$/)) ||
            (!newEmail.match(/([a-zA-Z0-9_\-.]+[@][a-zA-Z]+[.]{1}[a-z]{2,3})/))) {

            if (!newName.match(/^[a-zA-Z\s'-]{8,20}$/)) {
                toast.warn('The name must be Minimum 8 letters and Maximum 20 letters')
            }


            if (!newEmail.match(/^([a-zA-Z0-9_\-.]+[@]{1}[a-zA-Z]+[.]{1}[a-z]{2,3})$/)) {
                toast.warn('Enter the email in Standard format');
            }
        }
        else {
            //sending the user data to the server
            axios.patch('https://auth-backend-138t.onrender.com/api/v1/users/update-details', {
                "username": `${newUsername}`,
                "fullName": `${newName}`,
                "email": `${newEmail}`,
                "phone": `${newPhone}`,
                "dob": `${newdob}`
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authtoken')}`
                }
            }
            )
                .then(function (response) {
                    // console.log(response);
                    toast.success("Details updated successfully");
                })
                .catch(function (error) {
                    // console.log(error);
                    if (error.response && error.response.status === 409) {
                        toast.error('User already exists.');
                    } else {
                        toast.error('An error occurred. Please try again.');
                    }

                });
        }
    }

    return (
        <div style={obg} className='py-5'>
            <div className='Box container' style={bg}>
                <Name name={newName} setName={setnewName} />
                <Email email={newEmail} setEmail={setnewEmail} />
                <Username username={newUsername} setUsername={setnewUsername} />
                <DOB dob={newdob} setDob={setnewDob} />
                <Phone phone={newPhone} setPhone={setnewPhone} />
                <button type="button" className="btn btn-secondary my-4" onClick={updateDetails}>
                    Submit
                </button>
            </div>
        </div>
    )
}


function MainComponents() {


    //making states for display and output so to display output correctly
    const [display, setDisplay] = useState(false);
    const [output, setOutput] = useState(null);
    const { bg, obg, setBg, setobg } = useContext(BgContext);
    const { logout } = useContext(AuthContext)

    //logout function
    const mainLogout = () => {
        logout();
    }

    //Function to view Profile
    const viewProfile = () => {
        setDisplay(true);
        axios.get('https://auth-backend-138t.onrender.com/api/v1/users/current-user', {
            headers: {
                Authorization: `Bearer ${Cookies.get('authtoken')}`
            }
        })
            .then((res) => {
                const userData = res.data.data;
                console.log(userData);
                if (userData) {
                    // console.log(data);
                    setOutput(<UserInfo output={userData} />);
                }
                else {
                    throw new Error("");
                }
            }).catch(() => {
                toast.warn("Failed to fetch user details");
            })
    }

    //Change password
    const changePass = () => {
        setDisplay(true);
        setOutput(<ChangeLogic />)

    }

    // change updatePRofile
    const updateProfile = () => {
        setDisplay(true);
        setOutput(<Update />);
    }

    return (
        <div>
            <Navbar setBg={setBg} setobg={setobg} title={"Main Page"} />
            <div className="outerbox" style={obg} id='output'>
                <div className="buttons my-4" style={bg}>
                    <button className='btn btn-primary' onClick={mainLogout}>Logout</button>
                    <button className='btn btn-primary' onClick={viewProfile}>View Profile</button>
                    <button className='btn btn-primary' onClick={changePass}>Change Password</button>
                    <button className='btn btn-primary' onClick={updateProfile}>Update Profile</button>
                </div>
                {display && (
                    <div className="my-4" style={bg} id="outputBox">
                        {output}
                    </div>
                )}
            </div>
        </div >
    )
}

export default function Main() {
    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<ProtectedRoute><MainComponents /></ProtectedRoute>} />
            </Routes>
        </div>
    )
}

