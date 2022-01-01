import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import Button from '../components/Button'

const Login = () => {

    const [inputValue, setInputValue] = useState({
        email:'',
        password:'',
    })
console.log(inputValue);
    const [validEmail, setValidEmail] = useState(true)
    const [validPassword, setValidPassword] = useState(true)

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

//   const handleValidInput = () => {
//     const valueEmail = inputValue.email
//     const valuePassword = inputValue.password
//     setValidEmail(valueEmail.includes('@') && valueEmail.length >=4)
//     setValidPassword(valuePassword.length >= 4)

//   }

  const handleBlurInput = () => {
    const valueEmail = inputValue.email
    const valuePassword = inputValue.password
    if(!valueEmail){
        setValidEmail(false)
    }  
    if(!valuePassword) {
        setValidPassword(false)

    }
  }

  useEffect(() => {
      if(inputValue.email) {
          setValidEmail(inputValue.email.includes('@') && inputValue.email.length >=4)
      }
      if(inputValue.password) {
          setValidPassword( inputValue.password.length >= 4)

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
    if(!inputValue.email || !inputValue.email.includes('@') || !inputValue.password) return
    console.log('asd');
}

    return (
        <div className="login">
            <div className="login__overlay"></div>
            <div className="login__container">
            <form className="login__form">
                <h1 className="login__header">Sign In</h1>
                <div className="login__input">
                    <input
                     name='email' 
                    type="text" 
                    placeholder="Email or phone number"
                    value={inputValue.email}
                    onChange={handleInput}
                    
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
                    
                    onBlur={handleBlurInput}
                    />
        <div className="login__error">
                      {validPassword ? '' : <span className="error-message">Your password must contain between 4 and 60 characters.</span> }

        </div>

                </div>
                <Button 
                 onClick={handleSubmit}
                 className="login__btn mt-5">Sign In
                 </Button>
               
            </form>
            <div className="login__register">
                <div className="login__register__txt">
                    New to TMDB?
                    <Link
                      
                     className='ms-3 text-white' to='/register'>Register now
                     </Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login
