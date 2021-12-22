import { BrowserRouter, Route } from 'react-router-dom'
import Router from './router/Router'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <div className="main">
          <Router />
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
