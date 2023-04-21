// import { comments } from "./api.js";
import { getFunction } from "./api.js";
import { adTodo } from "./api.js";
import { likeButtonsPush } from "./Render.js";
// import {renderComments} from "./Render.js";

// переменные
const buttonElement = document.getElementById("add-button");
const textAdd = document.getElementById("text-input");
const nameCom = document.getElementById("name-input");
// перменная формы добавления
const newCommentForm = document.getElementById("addForm");
// переменная вставки ожидания
const waitingElement = document.getElementById("waiting");

likeButtonsPush();
getFunction();
// renderComments(comments);


// добавление коментариев POST
buttonElement.addEventListener("click", () => {
  if (textAdd.value === "" || nameCom.value === "") {
    alert("Заполните все поля");
    return;
  }
  newCommentForm.style.display = "none";
  waitingElement.style.display = "flex";
  adTodo();
  
});
