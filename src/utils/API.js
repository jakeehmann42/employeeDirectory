import axios from "axios";

const URL = "https://randomuser.me/api/?results=100&nat=US"

const API = {
    getTeam: () => axios.get(URL)
}

export default API;