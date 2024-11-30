import NavIcon from "./NavIcon"
import PropTypes from "prop-types"
const NavPanel=({loggedin,setPage,setLogged,setNotification,count})=>{
    return(
        <div className='col d-flex justify-content-end' style={{display:"flex"}}>
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