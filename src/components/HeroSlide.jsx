import {useEffect,useState,useRef} from 'react'
import {useNavigate} from 'react-router-dom'

import Button,{OutlineButton} from '../components/Button'

import apiConfig from '../api/apiConfig'
import tmdbApi,{movieType,category} from '../api/tmdbApi'

import SwiperCore, { Autoplay,EffectFade  } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

import Modal, {ModalContent} from '../components/Modal'


const HeroSlide = () => {

    SwiperCore.use([Autoplay,EffectFade])

    const [movieItems, setMovieItems] = useState([])
    useEffect(() => {
        const getMovies = async () => {
            const params = {}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular,{params})
                setMovieItems(response.results.slice(0,3))
            }
            catch {
                console.log('error getting movies list');
            }
        }
        getMovies()
    }, []);

    return (
        <div className="hero-slide">
        <Swiper
                modules={[Autoplay,EffectFade ]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                // effect="fade"
                // autoplay={{delay: 3000}}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                           <HeroSlideItem data={item} className={isActive ? 'active' : ''} />

                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {movieItems.map((item, i)=> {
                return <TrailerModal data={item} key={i}/>
            })}

        </div>
    )
}

const HeroSlideItem = ({data,className}) => {
const navigate = useNavigate()
const background = apiConfig.originalImage(data.backdrop_path)

const setModalActive = async () => {
    const modal = document.querySelector(`#modal__${data.id}`);
    
    const videos = await tmdbApi.getVideos(category.movie, data.id);

console.log(videos);
    if (videos.results.length > 0) {
        const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;

        modal.querySelector('.modal__content iframe').setAttribute('src', videSrc);
    } else {
        modal.querySelector('.modal__content').innerHTML = 'No trailer';
    }

    modal.classList.toggle('active');
}



    return (
        <div
         className={`hero-slide__item ${className}`}
         style={{backgroundImage:`url(${background})`}}
        >
            <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__poster"><img src={apiConfig.w500Image(data.poster_path)} alt="" /> </div>
        <div className="hero-slide__item__content__info">
            <div className="hero-slide__item__content__info__title">{data.title}</div>
            <div className="hero-slide__item__content__info__overview">{data.overview}</div>
            <div className="hero-slide__item__content__info__button">
                    <Button className="me-3" onClick={()=> navigate('/move/' + data.id)}>Watch now</Button>
                    <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
            </div>
        </div>
            </div>
        </div>
    )

}

const TrailerModal = ({data}) => {

    const iframeRef = useRef()
    const onClose = () => iframeRef.current.setAttribute('src','')

    return (
        <Modal id={`modal__${data.id}` } active={false}>
            <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width='100%' height='500px'         title='trailer' src=''></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide
