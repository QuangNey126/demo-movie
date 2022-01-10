import {useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {OutlineButton} from './Button'


const Alert = (props) => {
    const navigate = useNavigate()
    const contentAlertRef = useRef()
    const turnOffAlert = () => {
        contentAlertRef.current.parentNode.classList.remove('active')
        if(props.navigate) {
            setTimeout(()=> {navigate('/login')},800)
            
        }
    }

    return (
        <div  className={`alert ${props.active ? 'active' : ''}`}>
            <div  ref={contentAlertRef} className="alert__content">
            <h2>{props.children}</h2>
            <OutlineButton onClick={turnOffAlert} className="small ms-auto mt-2">Ok</OutlineButton>
            </div>
        </div>
    )
}

export default Alert
