import { createContext, useState, useEffect } from "react";
import api,{addJwt} from '../api/apiUser'
// import Loading from '../components/Loading'
const AuthContext = createContext({
    user: null,
    setUser: () => { },
    moviePurchase:null,
    setMoviePurchase:() => {},
    movieRent:null,
    setMovieRent:() => {},
});

const UserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [moviePurchase, setMoviePurchase] = useState([])
    const [movieRent, setMovieRent] = useState([])
    const [checkingLoginDone, setCheckingLoginDone] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setCheckingLoginDone(true)
            return
        }
        api.get('/me', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((response) => {
            setAuthUser(response.data)
            addJwt(token)
        }).catch(() => {
            localStorage.removeItem('token')
        }).finally(()=> {setCheckingLoginDone(true)})

        return () => {
            setAuthUser(null)
        }

    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token')
        // if (!token) {
        //     setCheckingLoginDone(true)
        //     return
        // }
        api.get('/userUpdate', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((response) => {
            setMoviePurchase(response.data[0].purchase)
            setMovieRent(response.data[0].rent)

        }).catch((err) => {
            console.log(err);
        })

        return () => {
            setMoviePurchase(null)
            setMovieRent(null)
        }

       }, []);
  
    if (!checkingLoginDone) {
        return ''
        // return <Loading numb=''>loading...</Loading>
    }

    return (
        < AuthContext.Provider value={{ user: authUser, setUser: setAuthUser,moviePurchase:moviePurchase,setMoviePurchase:setMoviePurchase,movieRent:movieRent,setMovieRent:setMovieRent }}>
            {children}
        </AuthContext.Provider>
    )

}
export { UserProvider }
export default AuthContext;
