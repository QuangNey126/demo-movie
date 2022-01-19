import {Link} from 'react-router-dom'
import apiConfig from '../api/apiConfig'

const Card = ({data,category,repository}) => {
        const link = '/'+category+'/'+data.id

        const bg = apiConfig.w500Image(data.poster_path)

        


    return (
        <Link className={`${!repository? '' : 'card-repository'}`} to={link}>
       <div className='card' style={{backgroundImage:`url(${bg})`}}>
                <i className='bx bxl-youtube'></i>
       </div>
      {!repository? <h5 className="pt-2">{data.title || data.name}</h5> : <div style={{width:'75%',padding:'1.25rem'}}>
      <h4 style={{fontSize:'1.75rem'}} className="pt-3">{data.title || data.name}</h4>
        <p style={{margin:'1rem 0',fontSize:'1rem',fontStyle:'italic',fontWeight:500}}>{data.releaseDate ? data.releaseDate : 'Upcoming'}</p>
        <p style={{fontSize:'0.8rem'}} >{data.overview}</p>
          </div>} 
        </Link>
    )
}

export default Card
