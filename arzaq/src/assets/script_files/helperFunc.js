import { register,login,refresh_token,get_chart,edit,post_job } from "./handle_requests";
import { login_form,register_form,profile_form,job_form } from "./Forms_classes";
import { jwtDecode } from 'jwt-decode'
import { send_order } from "./handle_requests";
export function Map_forms(type){
    switch(type){
        case 'register':
            return register_form
        case 'login':
            return login_form
        case 'profile':
            return profile_form
        case 'job_form':
            return job_form
    }
}

function request_mapper(type,body){
    switch(type){
        case 'register':
            return register(body)
        case 'login':
            return login(body)
        case 'profile':
            return edit(body)
        case 'token':
            return refresh_token(body)
        case 'job_form':
            return post_job(body)
    }
}

function help_submit(formData){
    //this functions helps the submit function to check for the validity of the input data 
    // and returns a list of errors and where they are on faliure
    const formObject={}
    const validation_errors={}
    var toggle=true;
    formData.forEach((value, key) => {
       if(key!='password-confirm'){
                validation_errors[key]=validate_input(key,value) 
       }
       else{
            validation_errors[key]=formObject['password']===value
       }
       if(!validation_errors[key]){
        toggle=false;
       }
       formObject[key]=value;
    });
    
    return toggle?{data:formObject,valid:true}:{error:validation_errors,valid:false}
}
function check_out(state,setPage,setLoggedin){
    console.log(state)
    switch(state){
        case 'register':
            setPage('login')
            break
        case 'login':
            setPage('home')
            setLoggedin(true)
            break
        case 'profile':
            setPage('user')
            break
        case 'job_form':
            console.log('lool')
            setPage('jops')
            break
    }
}
function validate_input(type,input){
    //each input is validated based upon it's type
    switch(type.toLowerCase()){
        case 'username':
            return /^[A-Za-z][A-Za-z0-9]{4,}$/.test(input)
        case 'firstname':
            return /^[a-zA-Z\u0621-\u064A\s]{4,20}$/.test(input)
        case 'lastname':
            return /^[a-zA-Z\u0621-\u064A\s]{4,20}$/.test(input)
        case 'password':
            return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input)
        case 'phonenumber':
            return /^(011|012|015)\d{8}$/.test(input)
        case 'email':
            return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(input)
        case 'Jop title':
            return /^[a-zA-Z\u0621-\u064A\s]{3,100}$/.test(input)
        case 'experince':
                return /^[a-zA-Z\u0621-\u064A\s]{3,100}$/.test(input)
        case 'job type':
                return /^[a-zA-Z\u0621-\u064A\s]{3,100}$/.test(input)
        default:
            return true
    }
}
function resolve_status(result,setNotification,notification,setValidations,formData,type,setPage,setLoggedin){
    //this function reslove the status of the answer from back end 
    //if the log in proceeds correctly the JWT token is saved in the local storage
    //the function switches the page to the home page
    //the user state changes to logged in 
    //on faluire the user is notified about the faliure and the cause of the faliure
    if(result.data.status==='success'){
        if(type=='login'){
            localStorage.setItem('accessToken', result.data.access_token);
            localStorage.setItem('refreshToken', result.data.refresh_token);
            localStorage.setItem('username',formData.get('username'))
            localStorage.setItem('profile',JSON.stringify(result.data.profile))
            localStorage.setItem('profile_pic',(result.data.profile.profile_image_url))
            localStorage.setItem('profile_cv',(result.data.profile.profile_cv_url))
        }
        check_out(type,setPage,setLoggedin)
        setNotification([result.data.message,(notification+1)%10])
        setValidations([]);
    }
    else if(result.data.status==='edited'){
        localStorage.setItem('profile',JSON.stringify(result.data.profile))
        check_out(type,setPage,setLoggedin)
        setNotification([result.data.message,(notification+1)%10])
        setValidations([]);
    }
    else if(result.data.status==='failure'){
        let error_array={}
        console.log(result)
        formData.forEach((value,key)=>{
            if(result.data.errors[key]){
                error_array[key]=false;
                error_array[key+"error"]=result.data.errors[key]
            }
            else{
                error_array[key]=true;
            }
        })
        setNotification([result.data.message,(notification+1)%10])
        setValidations(error_array);
    }
}
export function handle_submit(event,type,setNotification,notification,setValidations,setPage,setLoggedin){
    //this formulates the form data correctly to be sent to the back end
    //first it checks the validty of the data
    //if correct the request is sent occurding to the form type
    //if failed the user is notified about the wrong input field
    event.preventDefault();
    const formData = new FormData(event.target);
    const submit_validated=help_submit(formData)
    if(submit_validated.valid){
        request_mapper(type,submit_validated.data).then((result)=>{
           resolve_status(result,setNotification,notification,setValidations,formData,type,setPage,setLoggedin)
        })
    }
    else{
        setValidations(submit_validated.error);
    }
    event.target.reset() 
}

export function validate_JWT(token){
    if (!token) return false;
    const decoded = jwtDecode(token);
    
    const now = Date.now() / 1000; 
    
    return decoded.exp > now;
}

export function log_out(setNotification,setLogged,setPage,count){
    //a simple log out functions which deletes all the session data 
    const confirm = window.confirm('are you sure you want to log out')
    if(confirm){
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem('username')
        localStorage.removeItem('profile')
        localStorage.removeItem('profile_pic')
        localStorage.removeItem('profile_cv')
        sessionStorage.removeItem('refills')
        sessionStorage.removeItem('total')
        setNotification(['logged out',count+1])
        setLogged(false)
        setPage('login')
    }
}

export function check_token(isMounted,setPage,setLogged,setNotification,notification){
    //on load the function checks the validty of the JWT  access token 
    //if sucess the user is sent to the home page
    //if failed the function tries a refresh from the back end
    //if sucess the user is sent to the home page
    //if failed the user is notified that his session has ended and asked to log on again
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem('refreshToken')
    if(validate_JWT(accessToken)){
        if(!isMounted.current){
          isMounted.current=true;
        }
        setLogged(true)
        setPage('home')
        setNotification(['welcome back',notification[1]+1])
      }
      else if(refreshToken){
        refresh_token({'refresh':refreshToken}).then((result)=>{
          console.log(result)
          if(result.data.status==='success'){
            setLogged(true)
            setNotification([result.data.message,notification[1]+1])
            localStorage.setItem('accessToken', result.data.access_token);
            localStorage.setItem('refreshToken', result.data.refresh_token);
          }
          else{
            setNotification([result.data.message,notification[1]+1])
            setLogged(false)
          }
        }) 
      }
      else{
        setLogged(false)
        sessionStorage.removeItem('refills')
        sessionStorage.removeItem('total')
        localStorage.removeItem('username')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("profile");
        localStorage.removeItem('profile_pic')
        localStorage.removeItem('profile_cv')
      }
}

export function ask_chart(){
    const accessToken = localStorage.getItem("accessToken");
    return get_chart(accessToken).then((result)=>{
        console.log(result.data)
        return result.data
    })
}

export function try_refresh(setNotification,setRefill_request,setTotal,setCart,count,total_price,refill_request){
    //the user is asked for confiramtion before the order is sent
    //on confiramtion the order is sent to the back end
    //on sucess a notification is sent to the user and the cart is emptied
    //on faliure the user is notified to try again
    const confirm = window.confirm(`are you sure you want to submit your order`);
    if(confirm){
        const accessToken = localStorage.getItem("accessToken");
        const username = localStorage.getItem('username');
        send_order(accessToken,{'username':username,'totalprice':total_price,'orderlist':refill_request}).then((result)=>{
                console.log(result)
                setNotification(['Order sent',count+1])                  
                setRefill_request({})
                setTotal(0)
                setCart(false)
                sessionStorage.removeItem('refills')
                sessionStorage.removeItem('total')
         }).catch(()=>{
            setNotification(['an error occuerd please try again',count+1])
         })
    }
}
export function handel_refill(product,refill_request,total_price,setTotal,setRefill_request){
    // the user is asked for confirmation first
    //on  confirmation the product is added to the product list 
    //if the order already exists it's quantity is incremnted
    //the order list and total price is added to the session storage 
    const confirm = window.confirm(`add ${product.name} to refill list`);
        if(confirm){
            const temp={...refill_request}
            if(!temp[product.name]){
                temp[product.name]={'quantaity':1,'price':product.price}
            }
            else{
                temp[product.name]={'quantaity':temp[product.name].quantaity+1,'price':product.price}
            }
            sessionStorage.setItem('refills', JSON.stringify(temp));
            sessionStorage.setItem('total',total_price+parseFloat(product.price))
            setTotal(total_price+parseFloat(product.price))
            setRefill_request(temp)
        }
}