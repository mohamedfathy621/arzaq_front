
const Jop_list = ({title,salary,experience,job_type,company,setPost,post}) =>{
    
    return(
        <div className="row" onClick={()=>setPost(post)}>
        <div className="card  box-shadow"  style={{borderRadius:"0",margin:"auto",width:"98%",cursor:"pointer"}}  >
      <div className="card-body">
      <div className="row text-center">
              <div className="col">
                  <p style={{fontSize:"20px"}}>{title}</p>
                  <p style={{fontSize:"20px"}}>experince: {experience}</p>
              </div>
              <div className="col">
                  <p style={{fontSize:"20px"}}>salary: {salary}$</p>
                  <p style={{fontSize:"20px"}}>{job_type}</p>
              </div>
              <div className="col">
                  <p style={{fontSize:"20px"}}>company name: {company}</p>
              </div>
        </div>
      </div>
    </div>
        </div>
    )
}
export default Jop_list