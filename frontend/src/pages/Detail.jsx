import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import tmdbApi from '../api/tmdbApi'
import apiConfig from '../api/apiConfig'
import CastList from '../components/CastList'
import VideoList from '../components/VideoList'
import MovieList from '../components/MovieList'
import Button,{OutlineButton} from '../components/Button'

const Detail = () => {
const [item, setItem] = useState(null)
    const {category,id} = useParams()

useEffect(() => {
    const getDetail = async () => {
       const params = {}
        const response = await tmdbApi.detail(category,id,{params})
        setItem(response)
        window.scrollTo(0,0)
    }
    getDetail()
}, [category,id]);

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
                                <h2>Cast</h2>
                                <CastList id={item.id}/>
                            </div>
                        </div>
                    <div className="movie-content__info__button">
                                <Button className=' me-3'>Rental 4k: 1$</Button>
                                <OutlineButton className=' '>purchase 4k: 5$</OutlineButton>
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
