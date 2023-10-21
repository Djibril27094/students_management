import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'

const Footer = () => {
  const [pagesData, setPagesData] = useState([])
    useEffect(() =>{
        try {
            axios.get(baseUrl + "/pages/")
            .then(res => {
                setPagesData(res.data)
            })
        }catch(error) {
            console.log(error);
        }
    },[])
  return (
    <div className="container-fluid">
        <footer className="pt-3 mt-4 border-top bg-dark">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
              <li className="nav-item"><Link to="/faq" className="nav-link px-2 text-muted">FAQ</Link></li>
              { pagesData && pagesData.map((row , index) =>
                <li className="nav-item"><Link to={`/page/${row.id}${row.url}`} className="nav-link px-2 text-muted">{row.title}</Link></li>            
              )}
              <li className="nav-item"><Link to="/contact-us" className="nav-link px-2 text-muted">Contact Us</Link></li>
            </ul>
            <p className="text-center text-muted">&copy; Soleil Tech, Inc</p>
        </footer>
    </div>
  )
}

export default Footer