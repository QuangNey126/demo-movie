import {Link} from 'react-router-dom'
import HeroSlide from '../components/HeroSlide'
import {OutlineButton} from '../components/Button'
import MovieList from '../components/MovieList'
import {movieType,tvType,category} from '../api/tmdbApi'



const Home = () => {
    return (
        <div >
            <HeroSlide/>
            <div className="container mt-3">
                <section>
                <div className="section__header mb-3">
                    <h2>Trending movies</h2>
                    <Link to='/movie'>
                        <OutlineButton className="small">View more</OutlineButton>
                    </Link>
                </div>
                    <MovieList category={category.movie} type={movieType.popular}/>
                </section>
                {/* end section */}
                <section>
                <div className="section__header mb-3">
                    <h2>Top rated movies</h2>
                    <Link to='/movie'>
                        <OutlineButton className="small">View more</OutlineButton>
                    </Link>
                </div>
                    <MovieList category={category.movie} type={movieType.top_rated}/>
                </section>
                {/* end section */}
                <section>
                <div className="section__header mb-3">
                    <h2>Trending tv</h2>
                    <Link to='/tv'>
                        <OutlineButton className="small">View more</OutlineButton>
                    </Link>
                </div>
                    <MovieList category={category.tv} type={tvType.popular}/>
                </section>
                {/* end section */}
                <section className='pb-5'>
                <div className="section__header mb-3">
                    <h2>Top rate tv</h2>
                    <Link to='/tv'>
                        <OutlineButton className="small">View more</OutlineButton>
                    </Link>
                </div>
                    <MovieList category={category.tv} type={tvType.top_rated}/>
                </section>
                {/* end section */}
            </div>
       </div>
    )
}

export default Home
