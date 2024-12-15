import image from './assets/images/home.jpg'
import see_jop from './assets/images/see_jops.jpg'
import jop_hunt from './assets/images/jop_hunt.jpeg'
const Home = ()=>{
    return (
        <>  
        <div style={{width:"100%",height:"800px",marginBottom:"30px"}}>
        <div className='col-3' style={{position:"absolute",zIndex:"3",top:"20%"}}>
        <div className="form-card text-center container" style={{minHeight:"30rem",width:"400px",margin:"0px",padding:'0px'}}>
          <div  style={{borderBottom:"1px solid black",width:"100%",marginBottom:"30px"}}>
            <p style={{fontSize:"30px",padding:"2px"}}>Arzaq smart hiring</p>
          </div>
          <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"98%",cursor:"pointer"}}  >
          <div className="card-body">
            <div className='row text-center'>
              <p style={{fontSize:"20px"}}>LOOK FOR A JOP</p>
            </div>
          </div>
        </div>
        <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"98%",cursor:"pointer"}}  >
          <div className="card-body">
            <div className='row text-center'>
              <p style={{fontSize:"20px"}}>POST A JOP</p>
            </div>
          </div>
        </div>
        <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"98%",cursor:"pointer"}}  >
          <div className="card-body">
            <div className='row text-center'>
              <p style={{fontSize:"20px"}}>KNOW MORE ABOUT US</p>
            </div>
          </div>
        </div>
        </div>
        </div>
            <img src={image} style={{width:"100%",height:"800px",position:"absolute"}}></img>
        </div>
        
        <div className='form-card text-center' style={{width:"100%",minHeight:"600px",borderRadius:"0",marginBottom:"30px"}}>
            <h1 style={{textDecoration:"underline",marginBottom:"20px"}}>ARZAQ SMART HIRING SYSTEM</h1>
            <div className='row' style={{marginBottom:"40px"}}>
            <h1 style={{textDecoration:"underline"}}>Are you looking for a jop</h1>
                <div className='col'>
                    <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"50%",height:"100%",cursor:"pointer"}}  >
                        <div className="card-body">
                            <div className='row text-center'>
                                <p style={{fontSize:"20px"}}>Update your skills to reach more employeers</p>
                             </div>
                        </div>
                     </div>
                </div>
                <div className='col'>
                    <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"50%",height:"100%",cursor:"pointer"}}  >
                        <div className="card-body">
                            <div className='row text-center'>
                                <p style={{fontSize:"20px"}}>Upload your latest resume to stay up to date</p>
                             </div>
                        </div>
                    </div>
                </div>
                <div className='col'>
                        <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"50%",height:"100%",cursor:"pointer"}}  >
                            <div className="card-body">
                                <div className='row text-center'>
                                     <p style={{fontSize:"20px"}}>smart application submission system</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className='row'>
            <h1 style={{textDecoration:"underline"}}>Are you looking to hire someone</h1>
                <div className='col'>
                    <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"50%",height:"100%",cursor:"pointer"}}  >
                        <div className="card-body">
                            <div className='row text-center'>
                                <p style={{fontSize:"20px"}}>search for employees by title and skills</p>
                             </div>
                        </div>
                     </div>
                </div>
                <div className='col'>
                    <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"50%",height:"100%",cursor:"pointer"}}  >
                        <div className="card-body">
                            <div className='row text-center'>
                                <p style={{fontSize:"20px"}}>Post a jop hiring and wait for applicants </p>
                             </div>
                        </div>
                    </div>
                </div>
                <div className='col'>
                        <div className="card mb-4 box-shadow"  style={{borderRadius:"0",margin:"auto",width:"50%",height:"100%",cursor:"pointer"}}  >
                            <div className="card-body">
                                <div className='row text-center'>
                                     <p style={{fontSize:"20px"}}>create a profile for your company</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div className='form-card text-start' style={{width:"100%",minHeight:"600px",borderRadius:"0"}}>
            <div className=' row'>
                <div className=' col'>
                <h1 style={{width:"100%"}}> welocome to our smart hiring website</h1>
            <p style={{width:"100%",fontSize:"20px"}}>
            our system works on connecting employers and employees in a smart automatic fashion by using our website you can apply for your dream jop by reaching top tier employeers
            upload your cv to our database to appear in searches and in our recommendation system update your list of skills and experince to compete with other applicatns or if you
            are looking to hire for your company view our wide list of applicants where you can search by the position you are hiring for or by the set of skills needed for that 
            position post your jop in our database to appear for applicants our algorithm provides high accuracy recommendations for applicants based on thier skills and expierince
            </p>
                </div>
                <div className=' col'>
                     <div className="card mb-4 box-shadow"  style={{borderRadius:"0",maxWidth:"90%",cursor:'pointer'}}  >
                        <img className="card-img-top card_image" src={jop_hunt} />
                        <div className="card-body">
                            <div className="row text-center">
                                <h3>join our website </h3>
                            </div>
                        </div>
                     </div>
                </div>
                <div className=' col'>
                    <div className="card mb-4 box-shadow"  style={{borderRadius:"0",maxWidth:"90%",cursor:'pointer'}}  >
                        <img className="card-img-top card_image" src={see_jop} />
                        <div className="card-body">
                            <div className="row text-center">
                                <h3>see our jop list </h3>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home