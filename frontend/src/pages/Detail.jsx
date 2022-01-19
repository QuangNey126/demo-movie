import {useState,useEffect,useContext} from 'react'
import {useParams} from 'react-router-dom'
import tmdbApi from '../api/tmdbApi'
import apiConfig from '../api/apiConfig'
import CastList from '../components/CastList'
import VideoList from '../components/VideoList'
import MovieList from '../components/MovieList'
import Button,{OutlineButton} from '../components/Button'
import AuthContext from '../context/auth'
import ModalNotice,{ModalNoticeContent} from '../components/ModalNotice'
import api from '../api/apiUser'
import Alert from '../components/Alert'


const Detail = () => {
    const authCtx = useContext(AuthContext)
    const [item, setItem] = useState(null)

    const {category,id} = useParams()
    const [modalNoneUser, setModalNoneUser] = useState(false)
    const [modalHaveUser, setModalHaveUser] = useState(false)
    const [rentAndPurchase, setRentAndPurchase] = useState('rent')
    const [successRent, setSuccessRent] = useState(false)
    const [successPurchase, setSuccessPurchase] = useState(false)
    const [btnPurchased, setBtnPurchased] = useState(false)
    const [btnRented, setBtnRented] = useState(false)
    // console.log(btnRented);

useEffect(() => {
        const getDetail = async () => {
        const params = {}
        const response = await tmdbApi.detail(category,id,{params})
        setItem(response)
        window.scrollTo(0,0)
    }
    getDetail()
}, [category,id]);


useEffect(() => {
    api.get('/userUpdate').then((response) => {
        authCtx.setMoviePurchase(response.data[0].purchase)
        authCtx.setMovieRent(response.data[0].rent)

    }).catch((err) => {
        console.log(err);
    })
   }, []);

useEffect(() => {

    authCtx.moviePurchase.forEach(item=> {
        if(item.id === id) {
            setBtnPurchased(true)
        }
    })

    authCtx.movieRent.forEach(item=> {
        if(item.id === id) {
            setBtnRented(true)
        }
    })
    
}, [authCtx.moviePurchase,authCtx.movieRent,id]);




const handleRental =  () => {
    if(!authCtx.user){
        setModalNoneUser(true)
        return
     }
     if(authCtx.user) {
        setModalHaveUser(true)
        setRentAndPurchase('rent')
        return
     }

}
const handlePurchase =  () => {
    if(!authCtx.user){
        setModalNoneUser(true)
        return
     }
     if(authCtx.user) {
        setModalHaveUser(true)
        setRentAndPurchase('purchase')

        return
     }

}


const expired = async (idMovie,email) => {
try {
    setTimeout(()=> {
        api.post('/rent',{
            idMovie:idMovie,
            email:email,
        }).then((response) => {
                console.log('response',response);
        }).catch((error) => {
            console.log(error);
        })
        setBtnRented(false)

        },30000)
} catch (err) {
    console.log(err);
}
}


const handleAgreeRent = async () => {
    const dateObj = new Date()
    const day = dateObj.getDay() 
    const month = dateObj.getMonth() + 1
    const year = dateObj.getFullYear()
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()

    const date = `${day}-${month}-${year}`
    const time = `${minutes}:${hours}`

   try {
            const response = await api.put(`/rent`,{
                
                idMovie:id,
                nameMovie:item.title || item.name,
                overview:item.overview,
                releaseDate:item.release_date,
                poster_path:item.backdrop_path,
                category:category,
                email:authCtx.user.email,
                date:date,
                time:time
            })
            authCtx.setMovieRent(callback => [...callback,response.data])
            setModalHaveUser(false)
            setSuccessRent(true)
            setBtnRented(true)
            expired(id,authCtx.user.email)
         
            

        }
        catch (err) {
            console.log(err);
        }

}


const handleAgreePurchase = async () => {
    const dateObj = new Date()
    const day = dateObj.getDay() 
    const month = dateObj.getMonth() + 1
    const year = dateObj.getFullYear()
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()

    const date = `${day}-${month}-${year}`
    const time = `${minutes}:${hours}`

   try {
            const response = await api.put(`/purchase`,{
                idMovie:id,
                nameMovie:item.title || item.name,
                overview:item.overview,
                releaseDate:item.release_date,
                poster_path:item.backdrop_path,
                category:category,
                email:authCtx.user.email,
                date:date,
                time:time
            })
            authCtx.setMoviePurchase(callback => [...callback,response.data])
            setModalHaveUser(false)
            setSuccessPurchase(true)
            setBtnPurchased(true)

        }
        catch (err) {
            console.log(err);
        }
}



    return (
       <>
            {item && 
            <>
                <div className="banner" style={{backgroundImage:`url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                <div className="movie-content container">
                    <div className="movie-content__poster">
                    <div className="movie-content__poster__img"
                    style={{backgroundImage:`url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}
                    ></div>
                    </div>
                    <div className="movie-content__info">
                        <h1 className="movie-content__info__title">{item.title || item.name}</h1>
                        <div className="movie-content__info__genres">
                            {item.genres.map((item,index)=> {
                                return <span className='item' key={index}>{item.name}</span>
                            })}
                        </div>
                        <div className="movie-content__info__overview">{item.overview}</div>
                        <div className="movie-content__info__cast">
                            <div className="movie-content__info__cast__header">
                                <h4>Cast</h4>
                                <CastList id={item.id}/>
                            </div>
                        </div>
                    <div className="movie-content__info__button">
                           {btnRented ?<Button  className='disable me-3'>  Rent for 30 seconds</Button> : <Button onClick={handleRental} className='me-3'>  Rent for 30 seconds</Button> }  
                               {btnPurchased ? <OutlineButton className='disable'>Purchase</OutlineButton> : <OutlineButton onClick={handlePurchase}>Purchase</OutlineButton>} 

                                <ModalNotice active={modalNoneUser}  >
                                    <ModalNoticeContent modalActive={setModalNoneUser}>You have to sign in first</ModalNoticeContent>
                                </ModalNotice>

                                {rentAndPurchase === 'rent' ?  <ModalNotice active={modalHaveUser}  >
                                    <ModalNoticeContent agree={true} handleAgree={handleAgreeRent} modalActive={setModalHaveUser} >Are you sure you want to rent a movie for 4$?  </ModalNoticeContent>
                                </ModalNotice> : <ModalNotice active={modalHaveUser}  >
                                    <ModalNoticeContent agree={true} handleAgree={handleAgreePurchase} modalActive={setModalHaveUser} >Are you sure you want to purchase a movie for 4$?  </ModalNoticeContent>
                                </ModalNotice>
                                }

                                {successRent ? <Alert active='active'>successfully rented</Alert> : null}
                                {successPurchase ? <Alert active='active'>successfully purchased</Alert> : null}
                              
                    </div>
                    </div>
                </div>

                <section className='container pt-5'>
                    <VideoList id={item.id}/>
                </section>

                <div className="container mb-5 pb-5">
                    <h2>Similar</h2>
                    <MovieList type='similar' category={category} id={id}/>
                </div>
            </>

            }
            
        </>
    )
}

export default Detail
