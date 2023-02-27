/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { userService } from "services";

import axios from "axios";

import styles from "~styles/pages/account/register.module.scss";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        profile_path: ""
    });

    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const router = useRouter();
    const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(user.email) === false) {
            setError(true);
            setErrorText("Email is not valid");
            return false;
        }
        return true;
    }

    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState("");

    const handleUpload = async () => {
        setUploading(true);
        try {
            if(selectedFile !== ""){
                const formData = new FormData();
                formData.append("myImage", selectedFile);
                await axios.post("/api/upload", formData)
                .then(response => {
                    if(response.data.status == true){
                        user.profile_path = response.data.data
                        setUploading(false);
                    }
                });
            }
            
        } catch (error) {
            console.log(error.response?.data);
        }        
    };

    const registerUser = async () => {
        const result = await userService.register(user);
        if (result.status === true) {
            alert(result.message);
            await userService.setId(result.data.insertedId);
            router.push("/account/plan")
        } else {
            setError(true);
            setErrorText(result.message)
        }
    }

    const register = async () => {
        if (user.name !== "" && user.email !== "" && user.password !== "") {
            if (emailValidation()) {
                if (selectedFile){
                    handleUpload().then(function(){
                        registerUser()
                    });
                }else{
                    registerUser()
                }
            }
        } else {
            setError(true);
            setErrorText("Please fill all fields.");
        }
    }

    return (
        <div className={styles.screen}>
            <img className={styles.logo} src={"/assets/logo.png"} alt="logo" />
            <div className={styles.formContainer}>
                <h2>Setup your account.</h2>

                <div className={styles.formDetailsContainer}>
                    <div className={styles.detailsInputsContainer}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Your Name"
                            value={user.name}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    name: e.target.value,
                                });
                            }}
                        />
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <label className={styles.detailsProfilePictureContainer}>
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            hidden
                            onChange={({ target }) => {
                                if (target.files) {
                                    const file = target.files[0];
                                    setSelectedImage(URL.createObjectURL(file));
                                    setSelectedFile(file);
                                }
                            }}
                        />
                        {selectedImage ? (
                            <img src={selectedImage} alt="profile" />
                        ) : (
                            <img src={"/assets/profile.png"} alt="blank profile" />
                        )}
                    </label>
                </div>

                <input
                    type="password"
                    className={styles.input}
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => {
                        setUser({
                            ...user,
                            password: e.target.value,
                        });
                    }}
                />
                {
                    error && (
                        <p className={styles.errorText}>{errorText}</p>
                    )
                }
                <h4><a onClick={() => router.push('/account/login')}>Click here </a> to login.</h4>
            </div>

            <div
                disabled={uploading}
                style={{ opacity: uploading ? ".5" : "1" }}
                className={styles.nextButtonContainer}
                onClick={() => register()}
            >
                {
                    uploading? (
                        <img src="/assets/loading.gif" alt="loading" />
                    ) : (
                        <h5>Next</h5>
                    )
                }
            </div>
        </div>
    );
};

export default Register;
