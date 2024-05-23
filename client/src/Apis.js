import axios from "axios"

const apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials =true
export const getTodos = async(params)=>{
  console.log('first',params)
  let api = apiUrl+'/todos?'
  if(params.dayView){
    api +=  `&dayView=${params.dayView}`
  }if(params.id){
    api += `&id=${params.id}`
  }
  if(params.viewed ){
    api += `&viewed=${params.viewed}`
  }
    try {
      return  await axios.get(api)
    } catch (error) {
        console.log('Error fetching data')
    }
}


export const updateTodo = async(params)=>{
  console.log('ter',params)
    try {
      return  await axios.put(apiUrl + `/update-todo`, params,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
        console.log('Error updating data')
      }
    }
    
    export const addNewTodo = async(params)=>{
      console.log('fet',params)
      try {
        return await axios.post(apiUrl + `/add-todo`, params,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        console.log('Error adding data')
  }
}

  
export const deleteTodo = async(params)=>{
      try {
        return await axios.delete(apiUrl + `/delete-todo/${params}`)
      } catch (error) {
        console.log('Error adding data')
  }
}

