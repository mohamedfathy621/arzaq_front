import NavIcon from "./NavIcon"
import PropTypes from "prop-types"
const NavPanel=({loggedin,setPage,setLogged,setNotification,count})=>{
    return(
        <div className='col d-flex justify-content-end' style={{display:"flex"}}>
             {!loggedin?null:<NavIcon directon='home' name='home' icon='bx bxs-home' setPage={setPage}/>}
             {!loggedin?null:<NavIcon directon='user' name='view profile' icon='bx bxs-user' setPage={setPage}/>}
             {!loggedin?null:<NavIcon directon='jops' name='view jops' icon='bx bxs-briefcase' setPage={setPage}/>}
            <NavIcon directon='login' name={loggedin?'log out':'log in'} icon={loggedin?'bx bx-user':'bx bxs-user'} setPage={setPage} setLogged={setLogged} setNotification={setNotification} count={count}/>
           
        </div>
    )
}
NavPanel.propTypes = {
    setPage: PropTypes.func.isRequired,
    loggedin: PropTypes.bool.isRequired,
    setLogged: PropTypes.func.isRequired,
    setNotification:PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
};
export default NavPanel