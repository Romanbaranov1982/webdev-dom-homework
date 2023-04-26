import { adTodo, token } from "./api.js";
const listElement = document.getElementById("list");
function mainFunction ()  {
  const buttonElement = document.getElementById("add-button");
const textAdd = document.getElementById("text-input");
const nameCom = document.getElementById("name-input");
// перменная формы добавления
const newCommentForm = document.getElementById("addForm");
// переменная вставки ожидания
const waitingElement = document.getElementById("waiting");
 buttonElement.addEventListener("click", () => {
 if (textAdd.value === "" ) {
   alert("Заполните все поля");
   return;
 } else
 newCommentForm.style.display = "none";
 waitingElement.style.display = "flex";
 adTodo();

});
};

// лайки
const likeButtonsPush = (comments) => {
    const likeButtons = document.querySelectorAll(".like-button");
  
    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        console.log(1);
        const index = likeButton.dataset.like;
        if (comments[index].likedStatus === "like-button") {
          comments[index].likesComment += 1;
          comments[index].likedStatus = "like-button -active-like";
        } else if (
          comments[index].likedStatus === "like-button -active-like"
        ) {
          comments[index].likesComment -= 1;
          comments[index].likedStatus = "like-button";
        }
        renderComments(comments);        
      });
    }
  };

// рендер-функция
const renderComments = (comments) => {
  // вся страница
  let appEl = document.getElementById("app");
// Список комментариев
const commentsHtml = comments.map((comment, index, jS, y) => {   
   
  return `<li class="comment" data-text=" > ${comment.commentText} , ${comment.name} < "> <br>
  <div class="comment-header">
    <div >${comment.name} </div>
    <div>${comment.time}</div>
  </div>
          <div class="comment-body">

    <div  class="comment-text"  >${comment.commentText}</div>
  </div>
  <div class="comment-footer"> 
    <div class="likes">
      <span class="likes-counter">${comment.likesComment}</span>  
      <button class="like-button ${comment.likedStatus}" data-like="${index}"></button>
    </div>
  </div>
</li> `;
})
.join("");
// если нет токена
    if(!token){
      appEl.innerHTML = `<div class="container">
      <ul class="comments" id="list">
        <!-- рендерится из JS -->  
        ${commentsHtml}
      </ul>
      <p class="hidden" id="waiting">Данные сейчас добавляются</p>
      <!-- приглашение к авторизации -->
      <p class="autorisation-string">Чтобы добавить комментарии -  <a href="#" class="autorisaion-link" id="autorisaion-link">авторизуйтесь</a></p>
    `;
    document.getElementById("autorisaion-link").addEventListener("click",()=>{
    // кнопка "ссылка на авторизацию"
      appEl.innerHTML =` <div id="autorisationForm" class="add-form">
        <input
          id="nameAutor-input"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          value=""
        />
        <br>
        <input
          id="login-input"
          type="text"
          class="add-form-name"
          placeholder="Введите ваш login"
          value=""
        />
        <br>
        <input
          id="password-input"
          type="text"
          class="add-form-name"
          placeholder="Введите ваш пароль"
          value=""
        />
        
        <div class="add-form-row">
          <button class="add-form-button" id="autorisation-button">Авторизоваться</button>
        </div>
      </div>`;
      // кнопка "Зарегиться\Авторизоваться"
       document.getElementById("autorisation-button").addEventListener("click", () =>{
       appEl.innerHTML =`<div class="container">
        <ul class="comments" id="list">
          <!-- рендерится из JS -->  
          ${commentsHtml}
        </ul>
        <p class="hidden" id="waiting">Данные сейчас добавляются</p>
        <div id="addForm" class="add-form">
          <input
            id="name-input"
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
            value=""
          />
          <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
            id="text-input"
          ></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="add-button">Написать</button>
          </div>
        </div>
      </div>`;
     })
    })    
      
return;
    }    
  
    // если есть токен
  const appHtml =`<div class="container">
  <ul class="comments" id="list">
    <!-- рендерится из JS -->  
    ${commentsHtml}
  </ul>
  <p class="hidden" id="waiting">Данные сейчас добавляются</p>
  <div id="addForm" class="add-form">
    <input
      id="name-input"
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
      value=""
    />
    <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"
      id="text-input"
    ></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="add-button">Написать</button>
    </div>
  </div>
</div>`;
  appEl.innerHTML = appHtml; 
 mainFunction();
   
    likeButtonsPush(comments);  
  };
  export {renderComments, likeButtonsPush,}; 
  