import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class UserAPI{

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
      
        const url = `${BASE_URL}/${endpoint}`;
        let axiosConfig = { url, method };
      
        if (method === "get") {
          axiosConfig.params = data;
        } else {
          axiosConfig.data = data;
        }
      
        try {
          const response = await axios(axiosConfig);
          
          if (response && response.data) {
            return response.data;
          } else {
            throw new Error("Empty response or missing data property in response.");
          }
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response ? err.response.data.error : "Unknown error";
          throw Array.isArray(message) ? message : [message];
        }
      }

    static async login(userInfo){
            const res = await UserAPI.request("login", userInfo, "post");
            return res      
    }

    static async createUser (userInfo){
        const res = await UserAPI.request("create_user", userInfo, "POST");
        
        return res
    }
}

export default UserAPI;