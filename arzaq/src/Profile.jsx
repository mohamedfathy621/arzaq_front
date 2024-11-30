const Profile= ({setPage})=>{
    const profile= JSON.parse(localStorage.getItem('profile'))
    console.log(profile)
return(
    <div className="form-card" style={{minHeight:"30rem",width:"60%"}}>
        <div className="row">
            <div className="col">
            <img src={profile.profile_image_url} style={{width:"200px",height:"200px",marginRight:"40px"}}></img>
            </div>
            <div className="col">
                <h1 style={{marginBottom:'20px'}}>{profile.profile_name}</h1>
                <h3 style={{marginBottom:'20px'}}>{profile.profile_titles}</h3>
                <h3 style={{marginBottom:'20px'}}>{profile.profile_description}</h3>
                <h3 style={{marginBottom:'20px'}}>{profile.profile_email}</h3>
                <h3 style={{marginBottom:'20px'}}>{profile.profile_type}</h3>
                < button  className="btn btn-primary" onClick={()=>setPage('profile')}>EDIT</button>
            </div>
           
        </div>
          
      </div>
)
}
export default Profile