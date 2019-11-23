import axios from "axios";

const path = "http://localhost:8000/";

 const request = (req, params) => {
    axios.post(path + req, {
            params: params
        })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
}

export default request;