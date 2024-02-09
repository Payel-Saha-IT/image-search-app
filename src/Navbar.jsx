import React, { useEffect, useState } from "react";
import axios from "axios";
import IndividualImage  from "./IndividualImage";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
const Navbar=()=>{
    const [sname,setSname]=useState("");
    const [img,setImg]=useState("");
    const [link,setLink]=useState([]);
    const[err,setErr]=useState(null);

    const InputEvent=(event)=>{
        console.log(event.target.value);
        setSname(event.target.value);
        
    }

    const FetchImage=()=>{
        setImg(sname);
        setSname("");
    }

    useEffect(()=>{
        setErr("");
        axios.get(`https://api.unsplash.com/search/collections?page=1&query=${img}&client_id=aiy_EnF0S6sMAHFX4XgVoJHIx2t95dy9C_KXEIq_c64`).then(
            (response)=>{
                console.log(response.data.results[1]);
                setLink(response.data.results);
            }
        
            )
            .catch((error) =>{
                console.log(error.message);
                setErr(error.message);
            } );
    },[img])

    

    return(
        <>
            <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand">Image Searcher</a>
                <div className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={InputEvent} value={sname}/>
                    <button className="btn btn-outline-success" type="submit" onClick={FetchImage}>Search</button>
                    </div>
                </div>
             </nav>

           

             <div>
                {err!=="" ? <h2>{err}</h2>:

                   
                   
                        <div className="img-container">
                        {
                            link.map((value, index) => {
                                return (
                                    
                                <IndividualImage imglink={value.cover_photo.urls.small} key={index}/>
                                           
                                )
                             })
                        }
                       

                    </div>
                   
                }
                
            </div>

        </>
    );
}


export default Navbar;