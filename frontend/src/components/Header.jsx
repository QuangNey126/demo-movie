import {useRef,useEffect,useContext,useState} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import Logo from '../assets/logo.png'
import Button from '../components/Button'
import AuthContext from '../context/auth'
import ModalNotice,{ModalNoticeContent} from './ModalNotice'

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
const [alert, setAlert] = useState(false)
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
    setAlert(true)
}



    return (
       <div className="header" ref={headerRef}>
            {alert ? <ModalNotice active={true}>
                <ModalNoticeContent setAlert={setAlert}>Are you sure you want to log out?</ModalNoticeContent>
            </ModalNotice>: ''}
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
