import {Link} from 'react-router-dom'
import {useState,useEffect,useCallback} from 'react'
import Button from '../components/Button'
import apiUser from '../api/apiUser'
import Alert from './Alert'


const Register = () => {

    const [inputValue, setInputValue] = useState({
        email:'',
        name:'',
        password:'',
        confirmPassword:''
    })

    const [validEmail, setValidEmail] = useState(true)
    const [validName, setValidName] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [validConfirmPassword, setValidConfirmPassword] = useState(true)
    const [success, setSuccess] = useState(false)
    const [checkEmailExist, setCheckEmailExist] = useState(true)
    // const [validEmail2, setValidEmail2] = useState(false)
console.log('checkEmailExist',checkEmailExist);

    useEffect(() => {
        setCheckEmailExist(true)
          if(inputValue.email) {
              setValidEmail(inputValue.email.includes('@') && inputValue.email.length >=4)
          }
          if(inputValue.name) {
              setValidName(inputValue.name.length >0)
          }
          if(inputValue.password) {
              setValidPassword( inputValue.password.length >= 4)
          }
       if(inputValue.confirmPassword){
            setValidConfirmPassword(inputValue.confirmPassword === inputValue.password)
        }
    
      }, [inputValue]);

      useEffect(() => {
        window.scrollTo(0,0)
      }, []);

const checkEmailExits = useCallback(
    () => {
        apiUser.get('/allUser').then((res)=>{
            res.data.forEach(item => {
                console.log(item.email);
                console.log(inputValue.email);
                if(item.email === inputValue.email){
                    setCheckEmailExist(false)
                }
            })
         }).catch((err)=>{console.log(err);})
    },
    [inputValue.email],
)


     useEffect(() => {
        checkEmailExits()
     }, [checkEmailExits]);
    


    const handleInput = (e) => {
        checkEmailExits()
        const name = e.target.name
        const newValue = e.target.value
        setInputValue(prev => {
            return {
                ...prev,
                [name]:newValue
            }
        })
    }

    const handleBlurInput = () => {
        const valueEmail = inputValue.email
        const valueName = inputValue.name
        const valuePassword = inputValue.password
        const valueConfirmPassword = inputValue.confirmPassword
        if(!valueEmail){
            setValidEmail(false)
            
        }  
        if(!valueName){
            setValidName(false)
        }  
        if(!valuePassword) {
            setValidPassword(false)
        }
        if(!valueConfirmPassword) {
            setValidConfirmPassword(false)
        }
      }
 
    
  const handleSubmit = async (e) => {
        e.preventDefault()
        if(!inputValue.email){
            setValidEmail(false)
        }
        if(!inputValue.name){
            setValidName(false)
        }
        if(!inputValue.password){
            setValidPassword(false)
        }
        if(!inputValue.confirmPassword){
            setValidConfirmPassword(false)
        }

        if(!checkEmailExist) {
            // setValidEmail2(true)

            return
        }

        if(!inputValue.email.includes('@') || !inputValue.email.length >=4 || !inputValue.name  || !inputValue.password.length >= 4 || !inputValue.password || inputValue.confirmPassword !== inputValue.password) return

        setSuccess(true)
        setInputValue({
            email:'',
            name:'',
            password:'',
            confirmPassword:''
        })
        

        try {
            const response = await apiUser.post('/register', {
                 email: inputValue.email,
                 name: inputValue.name,
                 password: inputValue.password
             })
             console.log(response);
         
        }    
        catch(err) {
            console.log(err);
        }
        
     
  }

  

    return (
        <div className="login">
            <Alert active={success} navigate={true}>registered successfully</Alert>
           {/* {!checkEmailExist ?  <Alert active={true} >Email already exists.Please enter another email</Alert> : ''} */}
            <div className="login__overlay"></div>
            <div className="login__container">
            <form className="login__form">
                <h1 className="login__header">Register</h1>
                <div className="login__input">
                    <input
                     name='email' 
                    type="text" 
                    placeholder="Email "
                    value={inputValue.email}
                    onChange={handleInput}
                    onBlur={handleBlurInput}
                    />
                    <div className="login__error">
                        {!checkEmailExist || validEmail ? '' : <span className="error-message">Please enter a valid email.</span> }
                        {!checkEmailExist?  <span className="error-message">Email already exists.Please enter another email.</span> : ''}
                 
                      
                    </div>
                </div>
                <div className="login__input">
                    <input
                     name='name' 
                    type="text" 
                    placeholder="Nickname"
                    value={inputValue.name}
                    onChange={handleInput}
                    />
                           <div className="login__error">
                        {validName ? '' : <span className="error-message">Nickname must be required.</span> }
                 
                      
                    </div>
                
                </div>
                <div className="login__input">
                    <input
                     name='password' 
                    type="password" 
                    placeholder="Password"
                    value={inputValue.password}
                    onChange={handleInput}
                    // onInput={handleValidInput}
                    onBlur={handleBlurInput}
                    />
                 <div className="login__error">
                      {validPassword ? '' : <span className="error-message">Your password must contain between 4 and 60 characters.</span> }
                 </div>
                </div>
                <div className="login__input">
                    <input
                     name='confirmPassword' 
                    type="password" 
                    placeholder="Confirm Password"
                    value={inputValue.confirmPassword}
                    onChange={handleInput}
                    // onInput={handleValidConfirmPassword}
                    onBlur={handleBlurInput}

                    />
                 <div className="login__error">
                      {validConfirmPassword ? '' : <span className="error-message">Your confirm password and password must be match.</span> }
                   
                 </div>
                </div>
                <Button onClick={handleSubmit} className="login__btn mt-5">Register</Button>
            </form>
            <div className="login__register">
                <div className="login__register__txt">
                    Back to
                    <Link className='ms-2 text-white' to='/login'>Sign in</Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register
