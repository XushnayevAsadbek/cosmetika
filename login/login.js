const username = document.querySelector(".username");
const password = document.querySelector(".password");
const login = document.querySelector(".loginBtn");



const getLocalStorage = (key) =>{
    return localStorage.getItem(key);
};
const setLocalStorage = (key , value)  =>{
    localStorage.setItem(key,value);
}
const removeLocalStorage = (key) =>{
    localStorage.removeItem(key);
};
const clearLocalStorage =() =>{
    localStorage.clear();
};


const postData =async () => {
    try{
        const usernameInput = username.value;
        const passwordInput = password.value;
        const response = await fetch("https://api-renessans.mquvonchbek.uz/api/v1/auth/login",{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-type":"application/json ; charset=UTF-8",
        },
        body:JSON.stringify({
            username: usernameInput,
            password: passwordInput,
        }),
    }
    );


    if(!response.ok){
        throw new Error("something error")
    }
    const data = await response.json();
    setLocalStorage("token" , data.token);
    location.replace("../admin/admin.html")
    console.log(data);
    } catch( error){

        
        console.log(error);
    } finally{
        console.log("salom");
    }
};

const handleSumbit = loginBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    postData()
});


