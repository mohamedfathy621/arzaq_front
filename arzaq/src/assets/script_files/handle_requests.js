import axios from 'axios'
const base_url='http://127.0.0.1:8000/Rest/'
export function register(body){
    const request_url=`${base_url}register`
    return axios.post(request_url,body).then((result)=>{
        return result;
    }).catch((error)=>{
        
        return error.response;
    });
}

export function login(body){
    const request_url=`${base_url}login`
    return axios.post(request_url,body).then((result)=>{
       
        return result;
    }).catch((error)=>{
        
        return error.response;
    });
}
export function post_job(body){
    const request_url=`${base_url}jop`
    body['poster']=localStorage.getItem('username')
    console.log(body)
    return axios.post(request_url,body,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Attach token to Authorization header
        }}).then((result)=>{
        
        return result;
    }).catch((error)=>{
        
        return error.response;
    });
}
export function send_app(body){
    const request_url=`${base_url}apply`
    return axios.post(request_url,body,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Attach token to Authorization header
        }}).then((result)=>{
       
        return result;
    }).catch((error)=>{
        
        return error.response;
    });
}
export function get_app(body){
    const request_url=`${base_url}getapply`
    return axios.post(request_url,body,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Attach token to Authorization header
        }}).then((result)=>{
        
        return result;
    }).catch((error)=>{
        
        return error.response;
    });
}
export function get_jops(){
    const request_url=`${base_url}getjop`
    return axios.get(request_url,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Attach token to Authorization header
        }}).then((result)=>{
       
        return result;
    }).catch((error)=>{
       
        return error.response;
    });
}
export async function test (test_url,notification,setNotification){
    try {
        console.log("here am i "+test_url)
        const response = await fetch(`${base_url}check-url`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: test_url }),
        });
    
        const data = await response.json();
        if (data.error) {
         setNotification(['no data about links in this file',(notification+1)%10])
         return {'veridct': 'no data about this link'};
        } else {
            const stats = data.data.attributes.last_analysis_stats;
            const maliciousCount = stats.malicious || 0;
            const suspiciousCount = stats.suspicious || 0;
            const harmlessCount = stats.harmless || 0;
            if (maliciousCount > 0) {
                setNotification(['this file contains maliouces links',(notification+1)%10])
                return {'veridct': 'Malicious'};
              } else if (suspiciousCount > 0) {
                setNotification(['this file contains Suspicious links',(notification+1)%10])
                return {'veridct': 'Suspicious'};
              } else if (harmlessCount > 0) {
                setNotification(['this file is clean from malware',(notification+1)%10])
                return {'veridct': 'Clean'};
              } 
        }
      } catch {
        console.log('no data about this link');
      }
}
export function edit(body){
    const request_url=`${base_url}edit`
    body.username=localStorage.getItem('username')
    const token = localStorage.getItem("accessToken");
    return axios.post(request_url,body, {
        headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
        },
    }).then((result)=>{
        
        return result;
    }).catch((error)=>{
       
        return error.response;
    });
}
export function refresh_token(body){
    const request_url=`${base_url}token/refresh`
    return axios.post(request_url,body).then((result)=>{
        return result;
    }).catch((error)=>{
        
        return error.response;
    });
}

export function get_medications(Token){
    const request_url=`${base_url}medications/fetch`
    const token = Token // Get the token
    return axios.get(request_url,{
        headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
        }
    }).then((result)=>{
       
        return result;
    }).catch((error)=>{
       
        return error.response;
    });
}

export function send_order(Token,body){
    const request_url=`${base_url}medications/order`
    const token = Token // Get the token
    
    return axios.post(request_url,body,{
        headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
        }
    }).then((result)=>{
       
        return result;
    }).catch((error)=>{
       
        return error.response;
    });
}
  

export function get_chart(Token){
    const request_url=`${base_url}medications/chart`
    const token = Token // Get the token
    return axios.get(request_url,{
        headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
        }
    }).then((result)=>{
       
        return result;
    }).catch((error)=>{
       
        return error.response;
    });
}

export async function sendfile(formdata){

    const response = await axios.post(`${base_url}upload`,formdata,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Attach token to Authorization header
        }})
    return response
}