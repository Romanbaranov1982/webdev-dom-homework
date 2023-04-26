
import { getFunction } from "./api.js";
import { adTodo } from "./api.js";
import { likeButtonsPush } from "./Render.js";


likeButtonsPush();
getFunction();

// добавление коментариев POST
// function mainFunction ()  {
//   const buttonElement = document.getElementById("add-button");
// const textAdd = document.getElementById("text-input");
// const nameCom = document.getElementById("name-input");
// // перменная формы добавления
// const newCommentForm = document.getElementById("addForm");
// // переменная вставки ожидания
// const waitingElement = document.getElementById("waiting");
//  buttonElement.addEventListener("click", () => {
//   console.log("меня нажали !");
//  if (textAdd.value === "" || nameCom.value === "") {
//    alert("Заполните все поля");
//    return;
//  }
//  newCommentForm.style.display = "none";
//  waitingElement.style.display = "flex";
//  adTodo();

// });
// };
// mainFunction();



