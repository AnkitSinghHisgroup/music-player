import { useEffect, useState } from "react";
import axios from 'axios'
const useAuth = (code) => {

    const [auth, setAuth] = useState({
        accessToken: '',
        refreshToken: '',
        expiresIn: '',
    })



    useEffect(() => {
        axios.post('http://localhost:3001/login', { code })
            .then(res => {
                setAuth(res.data)
                window.history.pushState({}, null, '/');
            }).catch(err => {
                alert("1ST     " + JSON.stringify(err));
                window.location = '/';
                console.log(err);
            })
    }, [code])

    useEffect(() => {
        const timeInterval = setInterval(() => {
            axios.post('http://localhost:3001/refreshToken', { refreshToken: auth.refreshToken })
                .then(res => {
                    setAuth((auth) => ({ ...auth, ...res.data }));
                    window.history.pushState({}, null, '/');

                }).catch(err => {
                    alert("REFFRRES======" + JSON.stringify(err));
                    window.location = '/';
                    console.log(err);
                })
        }, (auth.expiresIn - 60) * 1000)

        return clearInterval(timeInterval)
    }, [auth.refreshToken, auth.expiresIn])


    return auth.accessToken;
}

export default useAuth;