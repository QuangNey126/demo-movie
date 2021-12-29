
import {useParams} from 'react-router-dom'
import MovieLayout from '../components/MovieLayout'

const Catalog = () => {

    const {category} = useParams()

    return (
        <div className="layoutContent container">
            <MovieLayout category={category}/>
        </div>
    )
}

export default Catalog
