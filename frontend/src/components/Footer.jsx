import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'
const Footer = () => {
    return (
        <div className='footer'>
            <div className="container">
                    <div className="footer__logo">
                        <img src={logo} alt="" />
                    <Link to='/'>TMDB</Link>
                    </div>
            <div className="footer__menu row">
            <div className="footer__menu__item col-xl-4">
                <Link to='/' >Home</Link>
                <Link to='/' >Contact Us</Link>
                <Link to='/' >Term and Services</Link>
                <Link to='/' >About Us</Link>
            </div>
            {/* end */}
            <div className="footer__menu__item col-xl-4">
                <Link to='/' >Live</Link>
                <Link to='/' >FAQ </Link>
                <Link to='/' >Premium</Link>
                <Link to='/' >Privacy Policy</Link>
            </div>
            {/* end */}
            <div className="footer__menu__item col-xl-4">
                <Link to='/' >You must watch</Link>
                <Link to='/' >Recent release</Link>
                <Link to='/' >Top IMDB</Link>
            </div>
            {/* end */}
            </div>
            </div>
        </div>
    )
}

export default Footer
