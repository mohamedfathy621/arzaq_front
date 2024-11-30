import PropTypes from "prop-types";

import { log_out } from "../script_files/helperFunc";
const NavIcon = ({directon,name,setPage,icon,setLogged,setNotification,count}) =>{
    const map_func= () =>{
        switch(name){
            case 'log out':
                log_out(setNotification,setLogged,setPage,count)
                break
            default:
                setPage(directon)
        }
    }
    return (
        <div style={{marginRight:"50px",cursor:"pointer",userSelect:"none"}} onClick={() => map_func()}>
                    <i className={icon+' text-center'} style={{zIndex:"3",fontSize:"25px"}}><p style={{fontSize:"15px"}}>{name}</p></i>
        </div>
    )
}
NavIcon.propTypes = {
    setPage:PropTypes.func.isRequired,
    directon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    setLogged:PropTypes.func,
    refill_request:PropTypes.object,
    setRefill_request:PropTypes.func,
    setTotal:PropTypes.func,
    order_length:PropTypes.number,
    setCart:PropTypes.func,
    cart: PropTypes.bool,
    setNotification: PropTypes.func,
    count:PropTypes.number
  };
export default NavIcon