import axios from "axios"

const URL = 'http://localhost:8000'

export const getTodos = async(params)=>{
  console.log('first',params)
    try {
      return  await axios.get(URL + `/todos?dayView=${params.dayView}&id=${params.id}`)
    } catch (error) {
        console.log('Error fetching data')
    }
}


export const updateTodo = async(params)=>{
    try {
      return  await axios.put(URL + `/update-todo/${params._id}`, params)
    } catch (error) {
        console.log('Error updating data')
      }
    }
    
    export const addNewTodo = async(params)=>{
      try {
        return await axios.post(URL + `/add-todo`, params)
      } catch (error) {
        console.log('Error adding data')
  }
}

  
export const deleteTodo = async(params)=>{
      try {
        return await axios.delete(URL + `/delete-todo/${params}`)
      } catch (error) {
        console.log('Error adding data')
  }
}

