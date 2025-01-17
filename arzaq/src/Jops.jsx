import { get_jops ,get_app} from "./assets/script_files/handle_requests"
import Jop_list from "./Jop_list"
import Jop_detail from "./Jop_detail"
import App_list from "./App_list"
import { useState,useEffect,useRef } from "react"
const Jops=({setPage,setNotification,notification})=>{
  const [jops,setJops] = useState()
  const [post,setPost] = useState()
  const [applys,setApplys] = useState()
  const loaded=useRef(false)
  const get_likes=()=>{
    const body= new FormData()
    body.append('poster',localStorage.getItem('username'))
    get_app(body).then((ans)=>{
      console.log(ans)
      setApplys(ans.data.applications)
    })
  }
  useEffect(()=>{
   if(!jops&&!loaded.current){
    get_jops().then((ans)=>setJops(ans.data.jobs))
    loaded.current=true
   }
  },[jops])
    return(
      <>
         <div className='col-3' style={{position:"absolute",zIndex:"3",top:"20%",display:post?"none":""}}>
        <div className="form-card text-center container" style={{minHeight:"10rem",width:"300px",margin:"0px",padding:'0px'}}>
          <div  style={{borderBottom:"1px solid black",width:"100%",marginBottom:"30px"}}>
            <p style={{fontSize:"30px",padding:"2px"}}>Arzaq smart hiring</p>
          </div>
        <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"98%",cursor:"pointer"}} onClick={()=>setPage('job_form')} >
          <div className="card-body">
            <div className='row text-center'>
              <p style={{fontSize:"20px"}}>POST A JOP</p>
            </div>
          </div>
        </div>
        <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"98%",cursor:"pointer"}} onClick={()=>get_likes()}>
          <div className="card-body">
            <div className='row text-center'>
              <p style={{fontSize:"20px"}}>view applications</p>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div className="form-card" style={{minHeight:"30rem",width:"60%", marginTop:"3%",padding:"5%"}}>
          <div className="row gx-5 gy-5">
              {applys?
              <>
              {applys.map((applicant)=> <App_list key={applicant.id} applicant={applicant}/>)}
              <button className="btn btn-warning" onClick={()=>setApplys()} style={{display:"block",margin:"auto",marginTop:"30px"}}> go back</button>
              </>
              :
              post
              ?<Jop_detail post={post} setPost={setPost} setNotification={setNotification} notification={notification}/>
              :
              jops?
              jops.map((posting)=>
              <Jop_list key={posting['id']} salary={posting['salary']} job_type={posting['jobtype']} title={posting['job_title']} experience={posting['experince']} company={posting['company']} setPost={setPost} post={posting}/>)
              :null}
          </div>
        </div>
      </>
    
    )
}
export default Jops