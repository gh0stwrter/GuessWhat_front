import axios from "axios";
import jwt from "jsonwebtoken";


export const SignAuth =  async (req, params) => {
    console.log(params)
    const data =  axios.post(req, params)
      .then(function (res) {
        console.log(res)
        let token = res.data.Token
          if (token) {
            let decoded = jwt.verify(token, 'my_secret_key')
            localStorage.setItem("token", token)
            localStorage.setItem("_id", decoded.IDUser)
            localStorage.setItem("name",decoded.Name)
            return true;
          }else{
            return "Mauvais Mot de passe ou Nom"
          }

        
        })
      .catch(function (error) {
        console.log(error);
      })
      return data
}


export const SignUp = async (req, params) => {
    await axios.post(req, params)
      .then(function (res) {
         console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      })
}


export const CreateRoomGame = async (req, params) => {
  console.log(params)
  await axios.post(req, params)
    .then(res =>{
      console.log(res)
    })
    .catch( error => {
      console.log(error);
    })
}

