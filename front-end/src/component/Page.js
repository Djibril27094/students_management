import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";

const baseUrl = 'http://localhost:8000/api'

function Page() {
    const {page_id , title_slug} = useParams()
    const [pagesData, setPagesData] = useState([])
    useEffect(() =>{
        try {
            axios.get(baseUrl + "/pages/" + page_id + "/"+title_slug)
            .then(res => {
                setPagesData(res.data)
            })
        }catch(error) {
            console.log(error);
        }
    },[page_id , title_slug])
    return (
        <div>
            <h2>{pagesData.title} </h2>
            <p>{pagesData.content} </p>
        </div>
    )
}

export default Page