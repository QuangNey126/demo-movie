import {useState,useEffect,useRef} from 'react'
import {useParams} from 'react-router-dom'
import tmdbApi from '../api/tmdbApi'

const VideoList = (props) => {

    const {category} = useParams()
    const [video, setVideo] = useState([])
    useEffect(() => {
        const getVideo = async () => {
            const response = await tmdbApi.getVideos(category,props.id)
            setVideo(response.results.slice(0,5))
        }
        getVideo()
    }, [category,props.id])

    return (
        <div>
            {video.map((item,i)=> {
                return <Video  key={i} data={item}/>
            })}
        </div>
    )
}

const Video = ({data}) => {

    const iframeRef = useRef()
    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
        iframeRef.current.setAttribute('height',height)
        
    }, []);

    return (
            <div className="video mb-5">
                <div className="video_title "><h2>{data.name}</h2></div>
                <iframe 
                src={`https://www.youtube.com/embed/${data.key}`}
                 width='100%'
                 ref={iframeRef}
                 title='video'
                ></iframe>
            </div>
    )
}


export default VideoList
