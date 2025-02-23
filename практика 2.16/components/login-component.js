import { loginUser, registerUser } from "../autorisationAPI.js";

export function renderLoginComponent ({
    appEl, 
    setToken,
    fetchTodosAndRender,
}) {
  let isLoginMode = true;
  // функция изменения формы входа
  const renderForm = ()=>{
        const appHtml = `<h1>Список задач</h1>
    <div class="form">
     <h3 class="form-title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
     <div class="form-row">
     ${isLoginMode ? "" : `Имя 
     <input
         type="text"
         id="name-input"
         class="input"       
       />
       <br></br>`}
     
       Логин
       <input
         type="text"
         id="login-input"
         class="input"
       
       />
     </div>
     <div class="form-row">
       Пароль
       <input
         type="password"
         id="password-input"
         class="input"
       
       />
     </div>
     <br />
     <button class="button" id="login-button">${isLoginMode ? "Войти" : "Зарегестрироваться"}</button>
     <br></br>
     <button class="button" id="toggle-button">Перейти к ${isLoginMode ? "регистрации" : "входу"}</button>
    </div>
    `;
           appEl.innerHTML = appHtml;
           // обработчик на кнопку "Зарегиться"
           document.getElementById('login-button').addEventListener('click',() =>{
            if(isLoginMode){
const login = document.getElementById("login-input").value;
           const password = document.getElementById("password-input").value;
           if(!login){
            alert('Введите логин');
            return;
           };
           if(!password) {
            alert("Введите пароль");
            return;
           }

        //  setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
         // обработчик логина
         loginUser({
          login: login,
          password: password,
        })
        .then((user) =>{
         
          setToken(`Bearer ${user.user.token}`);
          fetchTodosAndRender();
        })
        .catch((error) =>{
           // выводим ошибку неправильного пароля или логина
          alert(error.message);
        })
            } else {
              const login = document.getElementById("login-input").value;
              const name = document.getElementById("name-input").value;
              const password = document.getElementById("password-input").value;
              if(!name){
                alert('Введите имя');
                return;
               };
              if(!login){
               alert('Введите логин');
               return;
              };
              if(!password) {
               alert("Введите пароль");
               return;
              }
   
            // setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
            // обработчик логина
            registerUser({
             login: login,
             password: password,
             name: name,
           })
           .then((user) =>{
            
             setToken(`Bearer ${user.user.token}`);
             fetchTodosAndRender();
           })
           .catch((error) =>{
              // выводим ошибку неправильного пароля или логина
             alert(error.message);
           })
            }
           
         
           });
           // обработчик клика на кнопку регистрации
           document.getElementById("toggle-button").addEventListener('click', ()=>{
           isLoginMode = !isLoginMode;
                      renderForm();
           })
  }
renderForm();


}