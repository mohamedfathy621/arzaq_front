import PropTypes from "prop-types";
import { useState,useEffect } from "react";
import pdfToText from 'react-pdftotext'
import { test,sendfile } from "./assets/script_files/handle_requests";
const Profile= ({setPage,notification,setNotification})=>{
    const profile= JSON.parse(localStorage.getItem('profile'))
    const [urls, setUrls] = useState([]);
    const [pic,setPic] = useState();
    const [picsrc,setPicsrc] = useState(localStorage.getItem("profile_pic")?localStorage.getItem("profile_pic"):null)
    const [mal,setmal] = useState(false)
    const [cv,setFIle] = useState()
    
    const extractUrls = (text) => {
        const urlRegex = /\b(?:https?:\/\/|www\.)[^\s]+/g;
        
        let array= text.filter(word => urlRegex.test(word));
        
        return array;
      };
    const try_to_test = () =>{
        urls.forEach(url => {
            let verdict = ''
            test(url.split('//')[1],notification,setNotification).then(result=>verdict=result['veridct'])
            if(verdict!='Clean'){
                setmal(true)
            }
        })
    }
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFIle(file)
            const reader = new FileReader();
            reader.onload = async () => {
                pdfToText(file)
                .then(text => {
                   
                    setUrls(extractUrls(text.split(/\s+/)))})
                   
                 .catch(error => console.error("Failed to extract text from pdf"+error))
            };
            reader.readAsArrayBuffer(file);
        } else {
            setUrls([])
            setFIle()
            alert('Please upload a valid PDF file.');
        }
    };
    const handlePicChange = (event) =>{
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setPic(event.target.files[0])
        }
        else{
            alert('Please upload a valid image file.');
        }
    }
    const try_to_hit = () => {
        const button = document.getElementById('input');
        button.click();
    }
    const try_to_send = (file,name) =>{
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append('username',localStorage.getItem('username'))
        formdata.append('filename',name)
        sendfile(formdata).then((ans)=>{
            if(name=='profile_pic'){
                localStorage.setItem("profile_pic",ans.data.file_url)
                setPicsrc(ans.data.file_url)
                setPic()
            }
            else{
                localStorage.setItem("profile_cv",ans.data.file_url)
                setFIle()
            }
        })
    }
    useEffect(()=>{
        if(pic){
            const reader = new FileReader();
            reader.onload = () => {
                setPicsrc(reader.result); // Set the image source to the file's data URL
            };
            reader.readAsDataURL(pic)
        }
    },[pic])
return(
    <div className="form-card" style={{minHeight:"30rem",width:"60%",marginTop:"2%"}}>
        <div className="row" style={{marginBottom:"30px"}}>
            <div className="col">
            <div className="card card-img-top card_image" style={{width:"200px",height:"200px",marginRight:"0px",cursor:"pointer",marginLeft:'0px',marginBottom:"10px"}} onClick={try_to_hit}>   
            <img  src={picsrc} style={{maxWidth:'100%',height:"100%"}}></img>   
            <input type="file"  onChange={(event) => handlePicChange(event)} style={{visibility:"hidden"}} id="input"/>
            </div>
            <button className="btn btn-success" onClick={()=>try_to_send(pic,'profile_pic')} style={{display:pic?'block':'none'}}> submit</button>
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
            <div>
            <h5 style={{marginBottom:'20px',width:"70%"}}>cv : <a href={localStorage.getItem('profile_cv')} style={{color:"blue",textDecoration:"underline"}}>cloud link</a></h5>
            </div>
            <div className="row" >
            < button  className="btn btn-primary" onClick={()=>setPage('profile')} style={{width:"10%", margin:"auto",marginBottom:"30px"}}>EDIT</button>
            <div>
            <h5 style={{marginBottom:'20px',width:"70%"}}>upload a cv </h5>
            <input type="file" accept="application/pdf" onChange={handleFileChange}/>
            <button className="btn btn-success" onClick={()=>try_to_send(cv,'profile_cv')} style={{display:cv && !mal?'inline':'none'}}> submit</button>
            </div>
            </div>
          
      </div>
)
}
Profile.propTypes = {
    setPage: PropTypes.func.isRequired,
};
export default Profile