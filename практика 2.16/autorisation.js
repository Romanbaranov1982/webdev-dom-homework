import { addTodo, deleteTodo, getTodos } from "./autorisationAPI.js";
import { renderLoginComponent } from "./components/login-component.js";


let tasks = [];
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;



const fetchTodosAndRender = () => {
 return getTodos({token}).then((responseData) => {
     tasks = responseData.todos;
     renderApp();
   });
};


const renderApp = () => {
 const appEl = document.getElementById("app");
 if(!token){
//    const appHtml = `<h1>Список задач</h1>
// <div class="form">
//  <h3 class="form-title">Форма входа</h3>
//  <div class="form-row">
//    Логин
//    <input
//      type="text"
//      id="login-input"
//      class="input"
   
//    />
//  </div>
//  <div class="form-row">
//    Пароль
//    <input
//      type="text"
//      id="login-input"
//      class="input"
   
//    />
//  </div>
//  <br />
//  <button class="button" id="login-button">Войти</button>
// </div>
// `;
//        appEl.innerHTML = appHtml;
//        document.getElementById('login-button').addEventListener('click',() =>{
//          token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
//      fetchTodosAndRender();
//        });
       renderLoginComponent({ appEl, setToken: (newToken) =>{
    token = newToken;
       },
       fetchTodosAndRender
    });
       return

 };
 const tasksHtml = tasks
   .map((task) => {
     return `
     <li class="task">
       <p class="task-text">
         ${task.text} (Создал ${task.user?.name ?? 'Неизвестно'})
         <button data-id="${task.id}" class="button delete-button">Удалить</button>
       </p>
     </li>`;
   })
   .join("");
const appHtml = `<h1>Список задач</h1>    
<ul class="tasks" id="list">
 <!— Список рендерится из JS —>
 ${tasksHtml}
</ul>
<br />
<div class="form">
 <h3 class="form-title">Форма добавления</h3>
 <div class="form-row">
   Что нужно сделать:
   <input
     type="text"
     id="text-input"
     class="input"
     placeholder="Выпить кофе"
   />
 </div>
 <br />
 <button class="button" id="add-button">Добавить</button>
</div>`;
 

 appEl.innerHTML = appHtml;
 const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");
 const deleteButtons = document.querySelectorAll(".delete-button");

 for (const deleteButton of deleteButtons) {
   deleteButton.addEventListener("click", (event) => {
     event.stopPropagation();

     const id = deleteButton.dataset.id;

     // Подписываемся на успешное завершение запроса с помощью then
     deleteTodo({ token , id})
       .then((responseData) => {
         // Получили данные и рендерим их в приложении
         tasks = responseData.todos;
         renderApp();
       });

     renderApp();
   });
 }
buttonElement.addEventListener("click", () => {
 if (textInputElement.value === "") {
   return;
 }

 buttonElement.disabled = true;
 buttonElement.textContent = "Задача добавляется...";


   addTodo({
    token,
    text: textInputElement.value,
   })
   .then(() => {
     // TODO: кинуть исключение
     textInputElement.value = "";
   })
   .then(() => {
     return fetchTodosAndRender();
   })
   .then(() => {
     buttonElement.disabled = false;
     buttonElement.textContent = "Добавить";
   })
   .catch((error) => {
     console.error(error);
     alert("Кажется, у вас проблемы с интернетом, попробуйте позже");
     buttonElement.disabled = false;
     buttonElement.textContent = "Добавить";
   });

 renderApp();
});
};


renderApp();
