const path = "http://localhost:8000";
let localToken = localStorage.getItem("token")
let localName = localStorage.getItem("Name")
let localId = localStorage.getItem("_id")
let user = JSON.parse(localStorage.getItem("user"))



 const apiVar = {
        token: localToken,
        user: user,
        name: localName,
        id: localId,
        signUp: path + "/sign-up",
        signIn: path + "/sign-in",
        logout: path + "/logout",
        addScore: path + "/score",
        createRoom: path + "/create-game",
}

export default apiVar;
