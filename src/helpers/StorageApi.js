import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class StorageAPI {
    // static token;
  
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
        let message = err.response ? err.response.data.error.message : "Unknown error";
        throw Array.isArray(message) ? message : [message];
      }
    }

    static async getStorage() {
        const res = await StorageAPI.request("downriver_strg", {}, "get");
        console.log(`${BASE_URL}`)
        return res;
      }
    
    static async getBin(bin_name){
        const res = await StorageAPI.request(`downriver_strg/${bin_name}`, {}, "get");
        return res
    }  

    static async getGrades(){
        const res = await StorageAPI.request("grades", {}, "get");
        return res
    }

    static async updateBin(bin_name, data){
        const res = await StorageAPI.request(`downriver_strg/${bin_name}`, data, "patch")
        return res
    }

    static async addGrade(gradeData) {
      const res = await StorageAPI.request("grades", gradeData, "post");
      return res;
    }
}

export default StorageAPI;