import axios from "axios";


const instance =axios.create({
    baseURL:"https://todo-list-backend.herokuapp.com"
})


export default instance


