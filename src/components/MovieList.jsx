import {useState,useEffect} from 'react'

import tmdbApi,{category} from '../api/tmdbApi'

import {Swiper,SwiperSlide} from 'swiper/react'

import Card from '../components/Card'

const MovieList = (props) => {

        const [items, setItems] = useState([])

useEffect(() => {
    const getItems = async () => {
        let response
        const params = {}
        if(props.type !== 'similar') {
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(props.type,{params})
                    break
                    default:
                    response = await tmdbApi.getTvList(props.type,{params})
            }
        }else {
            response = await tmdbApi.similar(category.movie,props.id)
        }
        setItems(response.results)
    }
    getItems()
}, [props.category,props.id,props.type]);
    return (
        <div className="movie-list">
        <Swiper
        grabCursor={true}
        slidesPerView={6}
        spaceBetween={16}
        >
            {items.map((item,index)=> {
                return <SwiperSlide key={index}>
                  <Card data={item} category={props.category}/>
                </SwiperSlide>
            })}
        </Swiper>

        </div>
    )
}

export default MovieList
