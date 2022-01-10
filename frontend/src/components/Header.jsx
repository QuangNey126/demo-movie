import {useRef,useEffect,useContext} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import Logo from '../assets/logo.png'
import Button from '../components/Button'
import AuthContext from '../context/auth'

const Header = () => {

const headerData = [
    {
        text:'Home',
        path:'/'
    },
    {
        text:'Movies',
        path:'/movie'
    },
    {
        text:'Tv Show',
        path:'/tv'
    },
    {
        text:'User',
        path:'/user'
    },
]

const {pathname} = useLocation()
const active = headerData.findIndex(i=>i.path === pathname)
const headerRef = useRef()
const navigate = useNavigate()
const authCtx = useContext(AuthContext)
// const [isLoading, setIsLoading] = useState()

useEffect(() => {
    const scrollHeader = () => {
        if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            headerRef.current.classList.add('shrink')
        }else {
            headerRef.current.classList.remove('shrink')
        }
    }
    window.addEventListener('scroll',scrollHeader)

    return () => {
    window.removeEventListener('scroll',scrollHeader)
    }
}, []);

const handleSignOut = () => {
    localStorage.removeItem('token')
    authCtx.setUser(null)
    navigate('/')
}



    return (
       <div className="header" ref={headerRef}>
           <div className="container">
           <div className="header__logo">
               <img src={Logo} alt="" />
               <Link to='/'>TMDB</Link>
           </div>
        <ul className="header__navbar">
            {headerData.map((item,index)=> {
                return <li className={`${index === active ? 'active' : ''}`} key={index}>
                    <Link to={item.path}>{item.text}</Link>
                </li>
            })}
            {/* {authCtx.user ? <div className="user">User</div> : ''} */}
            {authCtx.user ? <Button onClick={handleSignOut} className='small ms-5'>Sign out</Button>: <Button onClick={()=> navigate('/login')} className='small ms-5'>Sign in</Button>}
        </ul>
           </div>
       </div>
    )
}

export default Header
