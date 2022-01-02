import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import Button from '../components/Button'

const Register = () => {

 

    const [inputValue, setInputValue] = useState({
        email:'',
        password:'',
        confirmPassword:''
    })

    console.log(inputValue);

    const [validEmail, setValidEmail] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [validConfirmPassword, setValidConfirmPassword] = useState(true)

    const handleInput = (e) => {
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
        const valuePassword = inputValue.password
        const valueConfirmPassword = inputValue.confirmPassword
        if(!valueEmail){
            setValidEmail(false)
        }  
        if(!valuePassword) {
            setValidPassword(false)
        }
        if(!valueConfirmPassword) {
            setValidConfirmPassword(false)
        }
      }
    

  useEffect(() => {
      if(inputValue.email) {
          setValidEmail(inputValue.email.includes('@') && inputValue.email.length >=4)
      }
      if(inputValue.password) {
          setValidPassword( inputValue.password.length >= 4)
      }
   if(inputValue.confirmPassword){
        setValidConfirmPassword(inputValue.confirmPassword === inputValue.password)
    }

  }, [inputValue]);

  const handleSubmit = (e) => {
        e.preventDefault()

        if(!inputValue.email){
            setValidEmail(false)
        }
        if(!inputValue.password){
            setValidPassword(false)
        }
        if(!inputValue.confirmPassword){
            setValidConfirmPassword(false)
        }

        if(!inputValue.email.includes('@') || !inputValue.email.length >=4 || !inputValue.password.length >= 4 || !inputValue.password || inputValue.confirmPassword !== inputValue.password) return
        console.log('asd');
  }

    return (
        <div className="login">
            <div className="login__overlay"></div>
            <div className="login__container">
            <form className="login__form">
                <h1 className="login__header">Register</h1>
                <div className="login__input">
                    <input
                     name='email' 
                    type="text" 
                    placeholder="Email or phone number"
                    value={inputValue.email}
                    onChange={handleInput}
                    // onInput={handleValidInput}
                    onBlur={handleBlurInput}
                    />
                    <div className="login__error">
                        {validEmail ? '' : <span className="error-message">Please enter a valid email or phone number.</span> }
                 
                      
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
