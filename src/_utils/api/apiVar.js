const path = "http://localhost:8000";
let localToken = localStorage.getItem("token")
let localName = localStorage.getItem("Name")
let localId = localStorage.getItem("_id")



 const apiVar = {
        token: localToken,
        name: localName,
        id: localId,
        signUp: path + "/sign-up",
        signIn: path + "/sign-in",
        logout: path + "/logout",
        addScore: path + "/score",
        createRoom: path + "/create-game",
}

export default apiVar;