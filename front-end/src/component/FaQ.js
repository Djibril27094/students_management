import React, { useState, useEffect , Fragment } from 'react';

import { Container } from "react-bootstrap"
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'

function FaQ() {

    const [faqData, setFaqData] = useState([])
    useEffect(() =>{
        try {
            axios.get(baseUrl + "/faq/")
            .then(res => {
                setFaqData(res.data)
            })
        }catch(error) {
            console.log(error);
        }
    },[])
    console.log(faqData);
    return(
        <Container className="mt-4">
            <h3 className='pb-1 mb-1 text-start'>FAQs</h3>
            <div className="accordion" id="accordionExample">
                {faqData && faqData.map((row , index) =>
                    <div className="accordion-item">
                    {index === 0 &&
                        <Fragment>
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                    {row.question}
                                </button>
                            </h2>
                            <div id={`collapse${index}`} className="accordion-collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {row.answer}
                                </div>
                            </div>
                        </Fragment>
                    }
                    {index > 0 &&
                        <Fragment>
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                    {row.question}
                                </button>
                            </h2>
                            <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {row.answer}
                                </div>
                            </div>
                        </Fragment>
                    }
                    </div>
                )}
            </div>
        </Container>
    )
}

export default FaQ