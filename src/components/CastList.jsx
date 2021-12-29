import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import tmdbApi from '../api/tmdbApi'
import apiConfig from '../api/apiConfig'
const CastList = (props) => {

const {category} = useParams()
const [cast, setCast] = useState([])
useEffect(() => {
    const getCredits = async () => {
        const response = await tmdbApi.credits(category,props.id)
        setCast(response.cast.slice(0,5))
    }
    getCredits()
}, [category,props.id])
    return (
        <div className="cast">
            {cast.map((item,index)=> {
                return <div key={index} className="cast-item">
                    <div className="cast-item__img" style={{backgroundImage:`url(${apiConfig.originalImage(item.profile_path)})`}}></div>
                    <div className="cast-item__name">{item.name}</div>
                </div>
            })}
        </div>
    )
}

export default CastList
