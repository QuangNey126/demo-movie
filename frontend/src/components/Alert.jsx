import {useRef,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {OutlineButton} from './Button'
import AuthCtx from '../context/auth'


const Alert = (props) => {
    const authCtx = useContext(AuthCtx)
    const navigate = useNavigate()
    const contentAlertRef = useRef()
    const turnOffAlert = () => {
        contentAlertRef.current.parentNode.classList.remove('active')
        if(props.navigate) {
            setTimeout(()=> {navigate('/login')},800)
        }
        if(props.editName){
            props.editName(true)
        }
        if(props.logOut){
            console.log('231231312123');
            props.setAlert(false)
            localStorage.removeItem('token')
            navigate('/')
            authCtx.setUser(undefined)
            // authCtx.setMoviePurchase(null)
            // authCtx.setMovieRent(null)
        }
    }

    return (
        <div  className={`alert ${props.active ? 'active' : ''}`}>
            <div  ref={contentAlertRef} className={`alert__content ${props.status}`}>
            <h2>{props.children}</h2>
            <OutlineButton onClick={turnOffAlert} className="small ms-auto mt-2">Ok</OutlineButton>
            </div>
        </div>
    )
}

export default Alert
