/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";
import bcrypt from "bcryptjs";
import { Spinner } from "reactstrap";

import { loadStripe } from "@stripe/stripe-js";

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "firebaseConfig";

import styles from "~styles/pages/profile.module.scss";

const Profile = () => {
    const [imageFile, setImageFile] = useState()
    const [downloadURL, setDownloadURL] = useState('')
    const [percent, setPercent] = useState(0);

    const handleSelectedFile = (files) => {
        if (files && files[0].size < 10000000) {
            setImageFile(files[0])
            const _imageFile = files[0]
            if (_imageFile) {
                const name = _imageFile.name
                const storageRef = ref(storage, `image/${name}`)
                const uploadTask = uploadBytesResumable(storageRef, _imageFile)
    
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const _percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setPercent(_percent);
                    },
                    (error) => {
                        swal({
                            title: "Error!",
                            text: error.message,
                            icon: "error",
                        });
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            user.profile_path = url
                            setDownloadURL(url)
                        })
                    },
                )
            }
        } else {
            swal({
                title: "Error!",
                text: "File size to large",
                icon: "error",
            });
        }
    }

    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        profile_path: "",
        email_newsletter: false,
        share_custom_varieties: false
    });
    const [isPro, setIsPro] = useState(false);

    const [originPassword, setOriginPassword] = useState("");

    useEffect(() => {
        getUser();
    }, [router.query])

    const getUser = async () => {
        if(userService.getId() !== null){
            const _result = await userService.getById(userService.getId());
            const user = _result.data;
            if (user !== null) {
                setOriginPassword(user.password);
                setUser(user);
                if(user.share_custom_varieties){
                    setIsPro(true);
                }
                if(router.query.session_id !== null && router.query.session_id !== undefined){
                    user.share_custom_varieties = true;
                    const result = await userService.update(userService.getId(), user);
                    if (result.status === true) {
                        router.replace("/profile");
                    } else {
                        swal({
                            title: "Error!",
                            text: result.message,
                            icon: "error",
                        });
                    }
                }
            }
        }
    }

    const updateUser = async () => {
        const result = await userService.update(userService.getId(), user);
        if (result.status === true) {
            swal({
                title: "Success!",
                text: result.message,
                icon: "success",
            }).then(function(){
                router.replace(router.asPath);
            });
        } else {
            swal({
                title: "Error!",
                text: result.message,
                icon: "error",
            });
        }
    }

    const checkoutProfile =  async () => {
        let stripePromise = null

        const getStripe = () => {
            if(!stripePromise) {
                stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY)
            }
            return stripePromise
        }

        const stripe = await getStripe()

        await stripe.redirectToCheckout({
            mode: 'payment',
            lineItems: [
                {
                    price: "price_1MkWysIDhuOwOk66RmgdkCAJ",
                    quantity: 1
                }
            ],
            successUrl: `${window.location.origin}/profile?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: window.location.origin
        })
    }

    const saveUser = () => {
        bcrypt.compare(user.password, originPassword, async function (err, isMatch) {
            if (err, user.password === "") {
                swal({
                    title: "Error!",
                    text: "Fill all fields",
                    icon: "error",
                });
            } else if (!isMatch) {
                swal({
                    title: "Error!",
                    text: "Use correct password",
                    icon: "error",
                });
            } else {
                user.profile_path = downloadURL;
                updateUser()
            }
        });
    }

    const deleteUser = async () => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to close this account?",
            icon: "warning",
            buttons: [
                'No, cancel it!',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                await userService.delete(userService.getId());
                localStorage.removeItem("user");
                localStorage.removeItem("userid");
                router.push("/account/register");
            }
        })
    }

    const cancelPro = async () => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to disconnect your payment?",
            icon: "warning",
            buttons: [
                'No, cancel it!',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                user.share_custom_varieties = false;
                var _result = await userService.update(userService.getId(), user);
                if (_result.status === true) {
                    swal({
                        title: "Success!",
                        text: "Disconnected your payment successfully.",
                        icon: "success",
                    }).then(function(){
                        location.reload();
                    });
                } else {
                    swal({
                        title: "Error!",
                        text: _result.message,
                        icon: "error",
                    });
                }
            }
        })
    }

    return (<>
        <h2 className={styles.subHeader}>Hello, {user.name}</h2>
        <div className={styles.profilesContainer}>
            <div className={styles.profileContainer}>
                <label className={styles.profileImage}>
                    <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        hidden
                        onChange={(e) => handleSelectedFile(e.target.files)}
                    />
                    {downloadURL ? (
                        <img src={downloadURL} alt="profile" />
                    ) : (
                        <img src={user.profile_path} alt="" />
                    )}
                    {
                        imageFile && percent < 100 && (
                            <Spinner color="info"> Loading... </Spinner>
                        )
                    }
                </label>
                
                <h3>Change Photo</h3>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                    <button className={styles.button1} onClick={() => {saveUser()}}>Save Changes</button>
                </div>
                <div className={styles.preferenceContainer}>
                    <h3>Preferences</h3>
                    <div className={styles.flexContainers}>
                        <div className={styles.flexContainer}>
                            <input
                                type="checkbox"
                                id="emailNewsletter"
                                checked={user.email_newsletter}
                                onChange={(e) =>
                                    setUser({ ...user, email_newsletter: e.target.checked })
                                }
                            />
                            <label htmlFor="emailNewsletter">Email Newsletter</label>
                        </div>
                        <div className={styles.flexContainer}>
                            <input
                                type="checkbox"
                                id="shareCustomVarieties"
                                checked={user.share_custom_varieties}
                                onChange={(e) =>
                                    setUser({ ...user, share_custom_varieties: e.target.checked })
                                }
                            />
                            <label htmlFor="shareCustomVarieties">Share Custom Varieties</label>
                        </div>
                        <button className={styles.button1} onClick={() => saveUser()}>Save Changes</button>
                    </div>
                </div>
                <button className={styles.button2} onClick={() => deleteUser()}>Close Account</button>
            </div>
            <div className={styles.profileContainer}>
                {
                    !isPro && (
                        <>
                            <h2>Upgrade to PRO</h2>
                            <h1>$5</h1>
                            <h5>per month</h5>
                        </>
                    )
                }
                <div className={styles.proContainer}>
                    <img src={"/assets/payment-pro.png"} alt="core" />
                    <h3>PRO Benefits</h3>
                    <div className={styles.benefitContainer}>
                        <h4>UNLIMITED Custom Varieties</h4>
                        <h4>PRIORITY Support</h4>
                        <h4>ACCESS to Variety Presets</h4>
                        <h4>UNLIMITED Season Plans</h4>
                    </div>
                </div>
                {
                    isPro ? (
                        <button className={styles.button3 + " " + styles.button4}>Access Priority Support</button>
                    ) : (
                        <button className={styles.button3} onClick={() => checkoutProfile()}>Upgrade Now</button>
                    )
                }
                {
                    isPro && (
                        <button className={styles.button2} onClick={() => cancelPro()}>Cancel PRO</button>
                    )
                }
            </div>
        </div>
    </>
    );
};

export default Profile;
