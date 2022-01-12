import {useContext,useState,useRef,useEffect} from 'react'
import AuthCtx from '../context/auth'
import Button,{OutlineButton} from '../components/Button'
import apiUser from '../api/apiUser'
import Card from '../components/Card'
import Alert from '../components/Alert'

const User = () => {

  
     
    const inputRef = useRef(null)
    const nameRef = useRef()
   
    const authCtx = useContext(AuthCtx)
    console.log('authCtx',authCtx);
    // const pswStr = authCtx.user.password
    const [toggleEdit, setToggleEdit] = useState(false)
    const [errEditName, setErrEditName] = useState(true)
    const [togglePassword, setTogglePassword] = useState(false)
    const [toggleSelect, setToggleSelect] = useState(false)
    const [activeBtn, setActiveBtn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            apiUser.get('/userUpdate').then((response) => {
                if(authCtx.user){
                    authCtx.setMoviePurchase(response.data[0].purchase)
                    authCtx.setMovieRent(response.data[0].rent)
                }
        
            }).catch((err) => {
                console.log(err);
            })
        }
       }, []);

    const handleEdit = () => {
        setToggleEdit(!toggleEdit)
    }
console.log(errEditName);
    const handleSave = () => {
        if(authCtx.user){
            setToggleEdit(!toggleEdit)
            apiUser.put('/user',{
                name:inputRef.current.value,
                email:authCtx.user.email,
            }).then((response) => {
                if(AuthCtx.user){

                    AuthCtx.setUser(response.data.name)
                }
            }).catch((error) => {
                console.log(error);
            })
            if(inputRef.current.value.trim() < 1) {
                setErrEditName(false)
                return
            }

            authCtx.user.name =  inputRef.current.value
        }

    }

    const passwordHide = (password) => {
        const arrPsw = password.split('')
        const hide = arrPsw.map(item => item = '*').join('')
        return hide
    }
    const passwordShow = (pswStr) => {

        return pswStr
    }

    const handlePassword = () => {
        setTogglePassword(!togglePassword)

    }

    const handleToggleBtn = (e) => {
        setToggleSelect(!toggleSelect)
        setActiveBtn(!activeBtn)
    }

    
 
    return (
        <div className="user">
            <div className="container">
                <div className="user__infoo mb-5">
                    <h1 className="mb-5">Info user:</h1>
            <div className="user__email mb-4">
                <h4 style={{letterSpacing:1}}>{authCtx.user ? `Email:  ${authCtx.email === null ? '': authCtx.user.email}` : ''}</h4>
            </div>
            <div className="user__info">
                <div style={{display:'flex'}} className="user__info__name mb-4">
                <h4 className="me-2">Username:</h4>
             { !toggleEdit ? <h4 ref={nameRef} className="me-3"> {authCtx.user === null ? '': authCtx.user.name}</h4> : <input ref={inputRef} placeholder={authCtx.user.name} /> }
                {!errEditName ? <Alert status='error' editName={setErrEditName} active={true}>User name must greater 1 character</Alert> : null}
               {!toggleEdit ?   <OutlineButton onClick={handleEdit} className={`${authCtx.user ? 'small' : 'hidden'}`}>Edit</OutlineButton> :  <OutlineButton className={`${authCtx.user ? 'small' : 'hidden'}`} onClick={handleSave}>Save</OutlineButton>}
                </div>
            </div>
            <div className="user__password">
            <div style={{display:'flex'}} className="user__info__password ">
                <h4 className="me-2">Password:</h4>
             {!togglePassword ? <h4 className="me-3"> {authCtx.user === null ? '': passwordHide( authCtx.user.password)}</h4> :  <h4 className="me-3"> {authCtx.user === null ? '': passwordShow(authCtx.user.password)}</h4>}  
              {!togglePassword ? <OutlineButton onClick={handlePassword} className={`${authCtx.user ? 'small' : 'hidden'}`} >Show</OutlineButton> : <OutlineButton onClick={handlePassword} className={`${authCtx.user ? 'small' : 'hidden'}`} >Hide</OutlineButton>}  
                </div>
            </div>
                </div>

                <div className="user__repository ">
                    <h1 className="mb-5">Repository: </h1>
                    <div className="user__repository__container">
                        <div className="user__repository__container__select">
                     {!activeBtn?<Button className='' onClick={handleToggleBtn}>Rented</Button> : <OutlineButton onClick={handleToggleBtn} className="">Rented</OutlineButton>}   
                     {!activeBtn? <OutlineButton onClick={handleToggleBtn} className="">Purchased</OutlineButton> : <Button className='' onClick={handleToggleBtn}>Purchased</Button>}   
                        </div>
                        <div className="user__repository__container__card">
                            
                         {toggleSelect ?  authCtx.moviePurchase.map((item,index)=> {
                                return <Card key={index} data={item} category={item.category} repository={true}/>
                            }) :  authCtx.movieRent.map((item,index)=> {
                                return <Card key={index} data={item} category={item.category} repository={true}/>
                            })}  
                        </div>
                    </div>
                    </div> 

            </div>
        </div>
    )
}

export default User
