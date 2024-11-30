import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import './assets/styles/app.css'
import { useState,useEffect,useRef } from 'react';
import { check_token } from './assets/script_files/helperFunc';
import MessageBox from './assets/small_comps/MessageBox';
import Head from "./Head"
import Form from './Form';
import Profile from './Profile';
function App() {
  const [page,setPage]= useState('login')
  const [notification,setNotification]= useState(['',0])
  const [loggedin,setLogged]=useState('loading')
  const isMounted = useRef(false)
  useEffect(()=>{
    check_token(isMounted,setPage,setLogged,setNotification,notification)
  },[loggedin])
  const map_loggin=(dir)=>{
    switch(dir){
      case 'home':
        return <Profile setPage={setPage}/>
      default:
        return <Form type={page} setPage={setPage} setNotification={setNotification} notification={notification} loggedin={loggedin} setLogged={setLogged}/>
    }
  }
  if(loggedin=='loading'){
    return(
      null
    )
  }
  return (
    <>
    <div style={{minHeight:"100vh",backgroundColor:"lightblue",overflow:'hidden'}}>
    <Head setPage={setPage} loggedin={loggedin} setLogged={setLogged} setNotification={setNotification} count={notification[1]} />
        {!loggedin?<Form type={page} setPage={setPage} setNotification={setNotification} notification={notification} loggedin={loggedin} setLogged={setLogged}/>:
          map_loggin(page)
        }
        <MessageBox notification={notification}/>
    </div>
    </>
  )
}

export default App
