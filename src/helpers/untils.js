import { API_BASE_URL, MACHINE_ENVIRONMENT } from "../config/constant";
export const console_log = (...log_data)=>{
    if(MACHINE_ENVIRONMENT === "prod") {
        return false
    }
    //return false;
    console.log (...log_data)
}
export const api_call = async (url, params = null) => {
    try{
        let response = null;
        if(params) {
            response = await fetch(API_BASE_URL + url, params);
        }else{
            response = await fetch(API_BASE_URL + url);
        }
        return response;       
    }catch(e){    
      return false
    }
}

