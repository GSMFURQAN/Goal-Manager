import axios from "axios"

const apiUrl = process.env.REACT_APP_API_URL;
const userData = JSON.parse(sessionStorage.getItem('account'))
const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${userData.jwt}`
  };
};

axios.defaults.withCredentials =true

export const getTodos = async(params)=>{
  let api = apiUrl+`/todos?userId=${userData?.userId}`
  if(params.dayView){
    api +=  `&dayView=${params.dayView}`
  }if(params.id){
    api += `&id=${params.id}`
  }
  if(params.viewed ){
    api += `&viewed=${params.viewed}`
  }
    try {
      const headers = getAuthHeaders();
      return await axios.get(api, { headers });
    } catch (error) {
        console.log('Error fetching data')
    }
}


export const updateTodo = async(params)=>{
  params = {...params, userId:userData?.userId}
  try {
    return  await axios.put(apiUrl + `/update-todo`, params,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userData?.jwt}`
      }
    })
  } catch (error) {
    console.log('Error updating data')
  }
}

export const addNewTodo = async(params)=>{
  params = {...params, userId:userData?.userId}
  try {
    return await axios.post(apiUrl + `/add-todo`, params,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userData?.jwt}`
          }
        })
      } catch (error) {
        console.log('Error adding data')
      }
    }
    
    
export const deleteTodo = async(params)=>{
      try {
        return await axios.delete(apiUrl + `/delete-todo/${userData?.userId}/${params}`,{
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userData?.jwt}`
          }
        })
      } catch (error) {
        console.log('Error adding data')
  }
}

export const savePreferences=async(params)=>{
try{
  return await axios.put(apiUrl + `/preferences`, params,{
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData?.jwt}`
        }
      })
}catch(error){
  console.log('Error uploading data')
}
}

export const getPreferences=async(params)=>{
  try {
    return await axios.get(apiUrl + `/preferences?userId=${params}`,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userData?.jwt}`
          }
        })
  } catch (error) {
    
  }
}