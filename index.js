import { getComments, addComment} from "./api.js";
  import {renderLoginComponents} from "./components/autorisationFunc.js";
  import { format } from "date-fns";

  let comments = [];
  let user = null;
//   let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
  let token = null;

// получение комментов + рендер списка
  const getAndRender = (token) => {
    return getComments({
      token
    }).then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
          id: comment.id,
        };
      });
      comments = appComments;
      renderComments();
    });
  };
  getAndRender();

// рендер-функция
  const renderComments = () => {
    const appEl = document.getElementById('app');
    
    const commentsHtml = comments.map((comment, index) => {
      const createDate = format(new Date(comment.date), 'yyyy-mm-dd hh.mm.ss');
      return `<li class="comment">
      <div class="comment-header">
        <div class="comment-name">${comment.name} </div>
        <div>${createDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text" >
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>      
          <button class="like-button ${comment.isLiked}" data-like="${index}"></button>
        </div>
      </div>
    </li>`;
    }).join('');
  
  
    const appHtml = `  
    <div class="container">
        <ul class="comments" id="list">
        ${commentsHtml}
      </ul>
      ${token ? `<div class="add-form">
        <input type="text" class="add-form-name" placeholder="Введите имя" id="name-input" disabled value="${user.name}"/>
        <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
          id="text-input" ></textarea>
        <div class="add-form-row">
        <button class="change-btn" id="change-user"> Сменить пользователя</button>
          <button class="add-form-button turn-off" id="add-button">Написать</button>
           
        </div>
  
      </div>
    </div>
    </br>
       `: `<p>Чтобы добавить комментарий, <a class="toAutorisation" id="toAuto">авторизуйтесь</a></p>`}`;
  
    appEl.innerHTML = appHtml;
  
    if (!token) {
  
      document.getElementById("toAuto").addEventListener('click', () => {
        renderLoginComponents({
          appEl,
          setToken: (newToken) => {
            token = newToken;
          },
          setUser: (newUser) => {
                  user = newUser;
                },
          getAndRender
        });
      });
      return;
    }
  
    const buttonElement = document.getElementById("add-button");
    const textInputElement = document.getElementById("text-input");
    const nameInputElement = document.getElementById('name-input');
    nameInputElement.value = user.name;
    document.getElementById("change-user").addEventListener("click",()=>{
    token = !token;
    return renderLoginComponents({
        appEl,
        setToken: (newToken) => {
          token = newToken;
        },
        setUser: (newUser) => {
                user = newUser;
              },
        getAndRender
      });
  })
  
  
    //Добавление комментария
  
    buttonElement.addEventListener("click", () => {
      if (textInputElement.value === "") {
        return;
      }
      buttonElement.disabled = true;
      buttonElement.textContent = "Комментарий сейчас добавляется...";
     addComment({
        "text": textInputElement.value,       
        token
      })
      .then(() => {
        return getAndRender();
      });
    });
  

  
  };
  
  getAndRender();


    // Обновление по кнопке
    // function addNewElement() {
    //   buttonElement.addEventListener('click', () => {
    //     getAndRender();
    //   });
    // }
    // addNewElement();
    
    // // лайки
// const likeButtonsPush = (comments) => {
//     const likeButtons = document.querySelectorAll(".like-button");
  
//     for (const likeButton of likeButtons) {
//       likeButton.addEventListener("click", (event) => {
//         event.stopPropagation();
//         console.log(1);
//         const index = likeButton.dataset.like;
//         if (comments[index].likedStatus === "like-button") {
//           comments[index].likesComment += 1;
//           comments[index].likedStatus = "like-button -active-like";
//         } else if (
//           comments[index].likedStatus === "like-button -active-like"
//         ) {
//           comments[index].likesComment -= 1;
//           comments[index].likedStatus = "like-button";
//         }
//         renderComments(comments);        
//       });
//     }
//   };



