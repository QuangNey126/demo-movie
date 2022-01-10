// import { createContext, useState,useEffect } from "react";
// import api from '../api/apiUser'
// const MovieList = createContext({
//     movieRental: null,
//     setMovieRental: () => { },
//     moviePurchase: null,
//     setMoviePurchase: () => { },
// });

// const MovieListProvider = ({ children }) => {
//     const [movieRental, setMovieRental] = useState([])
//     const [moviePurchase, setMoviePurchase] = useState([])

//     useEffect(() => {
//         const token = localStorage.getItem('tokenMovieRental')
//         api.get('/movieRental', {
//             headers: {
//                 Authorization2: `Bearer ${token}`
//             },
//         }).then((response) => {
//             console.log(response);
//             setMovieRental(response.data)
//         }).catch((error) => {
//             console.log(error);
//         })
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem('tokenPurchase')
//         api.get('/purchase',{
//             headers: {
//                 Authorization3: `Bearer ${token}`
//             },
//         }).then((response) => {
//             setMoviePurchase(response.data)
//         }).catch((error) => {
//             console.log(error);
//         })
//     }, []);
 
//     return (
//         < MovieList.Provider value={{ movieRental: movieRental, setMovieRental: setMovieRental,moviePurchase: moviePurchase, setMoviePurchase: setMoviePurchase }}>
//             {children}
//         </MovieList.Provider>
//     )

// }
// export { MovieListProvider }
// export default MovieList;
