import {useState,useEffect,useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import tmdbApi,{category,movieType,tvType} from '../api/tmdbApi'
import Card from './Card'
import {OutlineButton} from '../components/Button'
import Input from '../components/Input'
import Loading from './Loading'


const MovieLayout = (props) => {
    // console.log(props.category);
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [keyword, setKeyword] = useState(undefined);
    const [loading, setLoading] = useState(false)
useEffect(() => {
    const getLists = async () => {
        let response = null;
        if(keyword === undefined) {
            const params = {}
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming,{params})
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular,{params})

            }
        }else {
            const params = {
                query: keyword
            }
            response = await tmdbApi.search(props.category,{params})


        }
        setItems(response.results)
        setTotalPage(response.total_pages)
    }
    getLists()
}, [props.category,keyword]);

const loadMore = () => {
    setLoading(true)
    setTimeout(async () =>{
        let response = null;
        if(keyword === undefined) {
            const params = {
                page:page + 1
            }
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming,{params})
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular,{params})
            }
        }else {
            const params = {
                query: keyword,
                page:page + 1,
            }
            response = await tmdbApi.search(props.category,{params})
        }
        setItems([...items, ...response.results])
        setPage(page + 1)
        setLoading(false)
    },1000)
  
}

    return (
        <>
            <MovieSearch category={props.category} keyword={keyword} setKeyword={setKeyword}/>      

        <div className='movie-layout '>
            {items.map((item,index)=> {
                return <Card key={index} data={item} category={props.category}/>
            })}
        </div>
            {page < totalPage ? 
        <div className='movie-layout__loadmore mb-5'>
           {!loading ?  <OutlineButton onClick={loadMore}>Load more</OutlineButton> : <Loading numb='2'/>}
        </div>   
         :
       null
        }
        </>
    )
}

export const MovieSearch = (props) => {

    const navigate = useNavigate()

    const [keyword, setKeyword] = useState('')

const goToSearchPage = useCallback(
    () => {
        if(keyword.trim().length > 0 ) {
            navigate(`/${category[props.category]}/search/${keyword}`)
            props.setKeyword(keyword)
            // setKeyword('')
        }
    },
    [keyword,navigate,props],
)


useEffect(() => {
    const enterEvent = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            goToSearchPage();
        }
    }
    document.addEventListener('keyup', enterEvent);
    return () => {
        document.removeEventListener('keyup', enterEvent);
    };
}, [keyword, goToSearchPage]);

    return (
        <div className="search mb-5">
        <Input
        type='text'
        placeholder='search movie, tv...'
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
        />
        <button className='search__btn' onClick={goToSearchPage}>Search</button>
        </div>
    )
}


export default MovieLayout
