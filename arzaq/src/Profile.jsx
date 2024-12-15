import PropTypes from "prop-types";
import { useState } from "react";
import pdfToText from 'react-pdftotext'
import { test } from "./assets/script_files/handle_requests";
const Profile= ({setPage})=>{
    const profile= JSON.parse(localStorage.getItem('profile'))
    const [urls, setUrls] = useState([]);
    
    const extractUrls = (text) => {
        const urlRegex = /\b(?:https?:\/\/|www)[^\s]+/g;
        let array= text.filter(word => urlRegex.test(word));
        return array;
      };
    urls.forEach(url => {
             let verdict = ''
             test(url).then(result=>verdict=result['veridct'])
             if(verdict=='Suspicious'||verdict=='Malicious'){
                console.log(verdict)
             }
    })
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = async () => {
                pdfToText(file)
                .then(text => setUrls(extractUrls(text.split(/\s+/))))
                 .catch(error => console.error("Failed to extract text from pdf"+error))
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

return(
    <div className="form-card" style={{minHeight:"30rem",width:"60%",marginTop:"5%"}}>
        <div className="row" style={{marginBottom:"30px"}}>
            <div className="col">
            <div className="card card-img-top card_image" style={{width:"200px",height:"200px",marginRight:"0px",cursor:"pointer",marginLeft:'0px'}}>   
            </div>
            </div>
            <div className="col">
                <h1 style={{marginBottom:'20px'}}>{profile.profile_name}</h1>
                <h3 style={{marginBottom:'20px'}}>{'Titles: '+profile.profile_titles}</h3>    
            </div>
       
        </div>
        <h2 style={{marginBottom:'20px'}}>about {profile.profile_name}</h2>
            <div>
            <h5 style={{marginBottom:'20px',width:"70%"}}>{profile.profile_description}</h5>
            </div>
            <h2 style={{marginBottom:'20px'}}>{profile.profile_name+"'s"} contact info</h2>
            <div>
            <h5 style={{marginBottom:'20px',width:"70%"}}>email: {profile.profile_email}</h5>
            <h5 style={{marginBottom:'20px',width:"70%"}}>phone_number: {profile.profile_number}</h5>
            </div>
            <div>
            <h2 style={{marginBottom:'20px'}}>{profile.profile_name+" is "+profile.profile_type}</h2>
            </div>
            <div className="row">
            < button  className="btn btn-primary" onClick={()=>setPage('profile')} style={{width:"10%", margin:"auto"}}>EDIT</button>
            <div>
            <h5 style={{marginBottom:'20px',width:"70%"}}>upload a cv </h5>
            <input type="file" accept="application/pdf" onChange={handleFileChange}/>
            </div>
            </div>
          
      </div>
)
}
Profile.propTypes = {
    setPage: PropTypes.func.isRequired,
};
export default Profile