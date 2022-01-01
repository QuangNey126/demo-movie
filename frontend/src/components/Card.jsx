import {Link} from 'react-router-dom'
import apiConfig from '../api/apiConfig'

const Card = ({data,category}) => {

        const link = '/'+category+'/'+data.id

        const bg = apiConfig.w500Image(data.poster_path)


    return (
        <Link to={link}>
       <div className="card" style={{backgroundImage:`url(${bg})`}}>
                <i className='bx bxl-youtube'></i>
       </div>
       <h5 className="pt-3">{data.title || data.name}</h5>
        </Link>
    )
}

export default Card
