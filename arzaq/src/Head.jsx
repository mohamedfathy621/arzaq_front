import image from './assets/images/logo2.png'
import SearchBar from './assets/small_comps/SearchBar';
import NavPanel from './assets/small_comps/NavPanel';
import PropTypes from "prop-types";
const Head = ({setPage,loggedin,setLogged,setNotification,count}) =>{
    return(
        <div className="container Header-Container">
            <header className="d-flex flex-wrap py-1 border-bottom row" style={{paddingLeft:"3%",marginBottom:"0",paddingRight:"3%"}}>
                <div className='row' style={{position:"relative",top:"14px"}}>
                    <div className='col' style={{display:"flex",height:"60%"}}>
                        <img src={image} style={{width:"200px",height:"30px",marginRight:"40px"}}></img>
                        <SearchBar />
                     </div>
                     <NavPanel loggedin={loggedin} setPage={setPage} setLogged={setLogged}  setNotification={setNotification} count={count}/>
                </div>
            </header>
        </div>
    )
}
Head.propTypes = {
    setPage: PropTypes.func.isRequired,
    loggedin: PropTypes.bool.isRequired,
    setLogged: PropTypes.func.isRequired,
    setNotification:PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
};
export default Head;