import {renderComments} from "./Render.js";

const buttonElement = document.getElementById("add-button");
const textAdd = document.getElementById("text-input");
const nameCom = document.getElementById("name-input");
const listElement = document.getElementById("list");
// перменная формы добавления
const newCommentForm = document.getElementById("addForm");
// переменная вставки ожидания
const waitingElement = document.getElementById("waiting");


 let comments = [];
 // get функция
const getFunction = () => {
  fetch("https://webdev-hw-api.vercel.app/api/v1/roman-baranov/comments", {
    method: "GET",
  })
    .then((response) => {
      listElement.innerHTML = "Данные загружаются...";
      return response;
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          time: new Date(comment.date).toLocaleString(),
          commentText: comment.text,
          likesComment: comment.likes,
          likedStatus: "like-button",
        };
      });

      // comments = appComments;
      renderComments(appComments);
    });
};
getFunction();

// попробуем создать функцию POST
const adTodo = () => {
  fetch("https://webdev-hw-api.vercel.app/api/v1/roman-baranov/comments", {
    method: "POST",
    body: JSON.stringify({
      text: textAdd.value,
      name: nameCom.value,
    //   forceError: true,
    }),
  })
    .then((resp) => {
      if (resp.status === 400) {
        throw new Error("Количество символов не должно быть меньше трех");
      }
      if (resp.status === 500) {
        throw new Error("Сервер упал");
      } else return resp.json();
    })
    .then(() => {
      return getFunction();
    })
    .then(() => {
      newCommentForm.style.display = "flex";
      waitingElement.style.display = "none";
      textAdd.value = "";
      nameCom.value = "";
    })
    .catch((error) => {
      if (
        error.message === "Количество символов не должно быть меньше трех"
      ) {
        alert("Допишите больше символов");
        newCommentForm.style.display = "flex";
        waitingElement.style.display = "none";
        return;
      }
      if (error.message === "Сервер упал") {
        alert("Сервер временно не работает, попробуйте позже");
        newCommentForm.style.display = "flex";
        waitingElement.style.display = "none";
        // Здесь adTodo() необходима для дополнительного задания
        adTodo();
      } else {
        alert("Проблемы с интернетом");
        newCommentForm.style.display = "flex";
        waitingElement.style.display = "none";
      }
    });
};
// adTodo();
export {getFunction, adTodo, comments};