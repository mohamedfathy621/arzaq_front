
const App_list = ({applicant}) =>{
    
    return(
        <div className="row" onClick={()=>setPost(post)}>
        <div className="card  box-shadow"  style={{borderRadius:"0",margin:"auto",width:"98%",cursor:"pointer"}}  >
      <div className="card-body">
      <div className="row text-center">
              <div className="col">
                  <p style={{fontSize:"20px"}}>{applicant['applicant']}</p>
                  <p style={{fontSize:"20px"}}>email: {applicant['email']}</p>
                  <p style={{fontSize:"20px"}}>job title: {applicant['job']}</p>
              </div>
              <div className="col">
                  <p style={{fontSize:"20px"}}>number: {applicant['Phone_number']}</p>
                  <a href={applicant['cv_link']} style={{fontSize:"20px"}}>cv link</a>
              </div>
        </div>
      </div>
    </div>
        </div>
    )
}
export default App_list