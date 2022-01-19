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
    // const pswStr = authCtx.user.password
    const [toggleEdit, setToggleEdit] = useState(false)
    const [errEditName, setErrEditName] = useState(true)
    const [toggleSelect, setToggleSelect] = useState(false)
    const [activeBtn, setActiveBtn] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
    }, []);

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


    const handleToggleBtn = (e) => {
        setToggleSelect(!toggleSelect)
        setActiveBtn(!activeBtn)
    }

    
 
    return (
        <div className="user">
            <div className="container">
                <div className="user__infoo mb-5">
                    <h3 className="mb-5">Info user:</h3>
            <div className="user__email mb-4">
                <h5 style={{letterSpacing:1}}>Email: {authCtx.user ? `  ${authCtx.email === null ? '': authCtx.user.email}` : ''}</h5>
            </div>
            <div className="user__info">
                <div style={{display:'flex'}} className="user__info__name mb-4">
                {/* <h5 className="me-2"></h5> */}
             { !toggleEdit ? <h5 ref={nameRef} className="me-3">Username: {authCtx.user === null ? '': authCtx.user.name}</h5> : <input ref={inputRef} placeholder={authCtx.user.name} /> }
                {!errEditName ? <Alert status='error' editName={setErrEditName} active={true}>User name must greater 1 character</Alert> : null}
               {!toggleEdit ?   <OutlineButton onClick={handleEdit} className={`${authCtx.user ? 'small' : 'hidden'}`}>Edit</OutlineButton> :  <OutlineButton className={`${authCtx.user ? 'small' : 'hidden'}`} onClick={handleSave}>Save</OutlineButton>}
                </div>
            </div>
          
                </div>

                <div className="user__repository ">
                    <h3 className="mb-5">Repository: </h3>
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
