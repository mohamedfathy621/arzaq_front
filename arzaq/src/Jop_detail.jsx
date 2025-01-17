import { send_app } from "./assets/script_files/handle_requests"
const Jop_detail=({post,setPost,setNotification={setNotification},notification})=>{
    const send_play=()=>{
        const body= new FormData()
        body.append('applicant',localStorage.getItem('username'))
        body.append('poster',post['poster'])
        body.append('job',post['job_title'])
        body.append('job_id',post['id'])
        body.append('poster_user',post['poster_user'])
        if(localStorage.getItem('username')==post['poster_user']){
            setNotification(["you can't apply to your own jobs",(notification+1)%10])
        }
        else{
        send_app(body).then((ans)=>{
            if(ans.status==200){
                setNotification(['application sent',(notification+1)%10])
            }
            else{
                setNotification([ans.data.message,(notification+1)%10])
            }
        })
        }
    }
    console.log(post)
    return(
        <div className="form-card" style={{minHeight:"30rem",width:"60%",marginTop:"2%"}}>
        <div className="row" style={{marginBottom:"30px"}}>
            <div className="col">
                <h1 style={{marginBottom:'20px'}}>title: {post['job_title']}</h1>
                <h3 style={{marginBottom:'20px'}}>experince: {post['experince']}</h3>    
            </div>
       
        </div>
        <h2 style={{marginBottom:'20px'}}>{post['company']}</h2>
            <div>
            <h4 style={{marginBottom:'20px',width:"70%"}}>{'poster contact info'}</h4>
            <h5 style={{marginBottom:'20px',width:"70%"}}>name: {post['poster']}</h5>
            <h5 style={{marginBottom:'20px',width:"70%"}}>email: {post['email']}</h5>
            </div>
            <div>
            <h5 style={{marginBottom:'20px',width:"70%"}}>salary: {post['salary']}</h5>
            <h5 style={{marginBottom:'50px',width:"70%"}}>job type: {post['jobtype']}</h5>
            <button className="btn btn-success" onClick={()=>send_play()}> apply</button>
            <button className="btn btn-warning" onClick={()=>setPost()} style={{display:"block",margin:"auto"}}> go back</button>
            </div>
            
      </div>
    )
}
export default Jop_detail