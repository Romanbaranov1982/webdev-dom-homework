import { comments } from "./api.js";
import { getFunction } from "./api.js";
import { adTodo } from "./api.js";
import { likeButtonsPush } from "./Render.js";
import renderComments from "./Render.js";

// переменные
const buttonElement = document.getElementById("add-button");
// const listElement = document.getElementById("list");
const textAdd = document.getElementById("text-input");
const nameCom = document.getElementById("name-input");
// let data = new Date().toLocaleString();
// const deleteButton = document.getElementById("del-button");
// const commentElements = document.querySelectorAll(".comment");
// const likeBtns = document.querySelectorAll(".likes");
// const likeButtons = document.querySelectorAll(".like-button");
// перменная формы добавления
const newCommentForm = document.getElementById("addForm");
// переменная вставки ожидания
const waitingElement = document.getElementById("waiting");




// // создали массив
// let comments = [];

// // лайки
// const likeButtonsPush = () => {
//   const likeButtons = document.querySelectorAll(".like-button");

//   for (const likeButton of likeButtons) {
//     likeButton.addEventListener("click", (event) => {
//       event.stopPropagation();
//       console.log(1);
//       const index = likeButton.dataset.like;
//       if (comments[index].likedStatus === "like-button") {
//         comments[index].likesComment += 1;
//         comments[index].likedStatus = "like-button -active-like";
//       } else if (
//         comments[index].likedStatus === "like-button -active-like"
//       ) {
//         comments[index].likesComment -= 1;
//         comments[index].likedStatus = "like-button";
//       }
//       renderComments();
      
//     });
//   }
// };
// likeButtonsPush();
likeButtonsPush();


// const getFunction = () => {
//   fetch("https://webdev-hw-api.vercel.app/api/v1/roman-baranov/comments", {
//     method: "GET",
//   })// get функция
//     .then((response) => {
//       listElement.innerHTML = "Данные загружаются...";
//       return response;
//     })
//     .then((response) => {
//       return response.json();
//     })
//     .then((responseData) => {
//       const appComments = responseData.comments.map((comment) => {
//         return {
//           name: comment.author.name,
//           time: new Date(comment.date).toLocaleString(),
//           commentText: comment.text,
//           likesComment: comment.likes,
//           likedStatus: "like-button",
//         };
//       });

//       comments = appComments;
//       renderComments();
//     });
// };
// getFunction();
getFunction();

// создаем рендер функцию
// const renderComments = () => {
//   const commentsHtml = comments
//     .map((comment, index, jS, y) => {
//       return `<li class="comment" data-text=" > ${comment.commentText} , ${comment.name} < "> <br>
//       <div class="comment-header">
//         <div >${comment.name} </div>
//         <div>${comment.time}</div>
//       </div>
//               <div class="comment-body">

//         <div  class="comment-text"  >${comment.commentText}</div>
//       </div>
//       <div class="comment-footer"> 
//         <div class="likes">
//           <span class="likes-counter">${comment.likesComment}</span>  
//           <button class="like-button ${comment.likedStatus}" data-like="${index}"></button>
//         </div>
//       </div>
//     </li> `;
//     })
//     .join("");
//   listElement.innerHTML = commentsHtml;
//   likeButtonsPush();  
// };
// renderComments();
renderComments(comments);

// // // попробуем создать функцию POST
// const adTodo = () => {
//   fetch("https://webdev-hw-api.vercel.app/api/v1/roman-baranov/comments", {
//     method: "POST",
//     body: JSON.stringify({
//       text: textAdd.value,
//       name: nameCom.value,
//     //   forceError: true,
//     }),
//   })
//     .then((resp) => {
//       if (resp.status === 400) {
//         throw new Error("Количество символов не должно быть меньше трех");
//       }
//       if (resp.status === 500) {
//         throw new Error("Сервер упал");
//       } else return resp.json();
//     })
//     .then(() => {
//       return getFunction();
//     })
//     .then(() => {
//       newCommentForm.style.display = "flex";
//       waitingElement.style.display = "none";
//       textAdd.value = "";
//       nameCom.value = "";
//     })
//     .catch((error) => {
//       if (
//         error.message === "Количество символов не должно быть меньше трех"
//       ) {
//         alert("Допишите больше символов");
//         newCommentForm.style.display = "flex";
//         waitingElement.style.display = "none";
//         return;
//       }
//       if (error.message === "Сервер упал") {
//         alert("Сервер временно не работает, попробуйте позже");
//         newCommentForm.style.display = "flex";
//         waitingElement.style.display = "none";
//         // Здесь adTodo() необходима для дополнительного задания
//         adTodo();
//       } else {
//         alert("Проблемы с интернетом");
//         newCommentForm.style.display = "flex";
//         waitingElement.style.display = "none";
//       }
//     });
// };
// adTodo();

// добавление коментариев POST
buttonElement.addEventListener("click", () => {
  if (textAdd.value === "" || nameCom.value === "") {
    alert("Заполните все поля");
    return;
  }
  newCommentForm.style.display = "none";
  waitingElement.style.display = "flex";
  adTodo();
  renderComments(comments);
});
renderComments(comments);
//


// // ответы на комментарии
// const commentsAnswerFunc = () => {
//   const commentAwrs = document.querySelectorAll(".comment");

//   for (const commentAwr of commentAwrs) {
//     commentAwr.addEventListener("click", () => {
//       const y = commentAwr.dataset.text;
//       y.value = y
//         .replaceAll("&", "&amp;")
//         .replaceAll("<", "&lt;")
//         .replaceAll(">", "&gt;")
//         .replaceAll('"', "&quot;");
//       const jS = textAdd.value + y;

//       textAdd.value = jS;
//     });
//   }
// };
// commentsAnswerFunc();