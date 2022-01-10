import { BrowserRouter } from 'react-router-dom'
// import { useState, useEffect } from 'react'
import Router from './router/Router'
import Header from './components/Header'
import Footer from './components/Footer'
// import Loading from './components/Loading'

function App() {

  // const [show, setShow] = useState(false)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShow(true)
  //   }, 1500)

  // }, [show]);

  // if (!show) {
  //   return <Loading numb=''>sadasd</Loading>
  // }

  return (

    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
