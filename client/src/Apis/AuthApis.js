import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const register=(params)=>{
    try {
     return   axios.post(apiUrl + '/register',params) 
    } catch (error) {
        
    }
}
export const loginUser=async(params)=>{
    try {
      return await axios.post(apiUrl + '/login', params);
      } catch (error) {
          return error
        }
       
    }