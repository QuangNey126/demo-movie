import React, { useState, useEffect, useRef ,useContext} from 'react';
import Button, {OutlineButton} from './Button'
import {useNavigate} from 'react-router-dom'
import AuthCtx from '../context/auth'
const ModalNotice = props => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    return (
        <div className={`modalNotice ${active ? 'active' : ''}`}>
            {props.children}
        </div>
    );
}

export const ModalNoticeContent = props => {

    const authCtx = useContext(AuthCtx)
    const [agree, setAgree] = useState(false)


    useEffect(() => {
        setAgree(props.agree)
    }, [props.agree]);

    const navigate = useNavigate()

    const contentRef = useRef(null);

    const closeModalNotice = () => {

        contentRef.current.parentNode.classList.remove('active');
        if(props.modalActive) {
            props.modalActive(false)
            return
        }
        if(props.setAlert){
            props.setAlert(false)
        }
        }
        const handleButton = () => {
            if(props.setAlert) {
                contentRef.current.parentNode.classList.remove('active');
                authCtx.setUser(null)
                localStorage.removeItem('token')
                props.setAlert(false)
                navigate('/')
                return
            }
            navigate('/login')
        }

    return (
        <div ref={contentRef} className="modalNotice__content">
            <div className="modalNotice__content__title">{props.children}</div>
            <div className="modalNotice__content__btn">
                <OutlineButton onClick={closeModalNotice} className='small me-2'>Cancel</OutlineButton>
                {agree ? <Button onClick={props.handleAgree}  className='small'>I agree</Button> : <Button onClick={handleButton}  className='small'>{props.setAlert ? 'log out' : 'Go to sign in'}</Button>}
                
            </div>
        </div>
    )
}



export default ModalNotice;