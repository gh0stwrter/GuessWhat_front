import axios from "axios";
import jwt from 'jsonwebtoken';
import apiVar from "./apiVar";
import {store} from "react-notifications-component";

export const SignAuth = async (req, params) => {
    console.log(params)
    const data = await axios.post(req, params)
        .then((res) => {
            console.log(res)
            let token = res.data.Token;
            if (token) {
                let decoded = jwt.verify(token, 'my_secret_key');
                localStorage.setItem("token", token);
                if (decoded) {
                    let user = {
                        id: decoded.IDUser,
                        name: decoded.Name,
                        token
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    apiVar.user = JSON.parse(localStorage.getItem('user'));
                    store.addNotification({
                        title: "Wonderful!",
                        message: "Vous êtes connecté avec succés",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    })
                } else {
                    store.addNotification({
                        title: "Error",
                        message: "Mauvais mot de passe ou Identifiant",
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    })
                }
                return true;
            } else {
                store.addNotification({
                    title: "Error",
                    message: "Mauvais mot de passe ou Identifiant",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                })
            }
        })
        .catch(function (error) {
            store.addNotification({
                title: "Error",
                message: 'Mauvais mot de passe ou Identifiant',
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
        })
    return data
}


export const SignUp = async (req, params) => {
    await axios.post(req, params)
        .then(function (res) {
            console.log(res);
            store.addNotification({
                title: "Bienvenu ! ",
                message: 'Compte inscris avec succés',
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
        })
        .catch(function (error) {
            store.addNotification({
                title: "Error",
                message: '' + error,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
        })
}


export const CreateRoomGame = async (req, params) => {
    await axios.post(req, params)
        .then(res => {
            store.addNotification({
                title: "Salon bien ajouté",
                message: 'votre salon est créé',
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
}

