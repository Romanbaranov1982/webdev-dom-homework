import { comments } from "./api.js";

const listElement = document.getElementById("list");

const renderComments = () => {
    const commentsHtml = comments
      .map((comment, index, jS, y) => {
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
    listElement.innerHTML = commentsHtml;
    likeButtonsPush();  
  };
  renderComments();

  // лайки
const likeButtonsPush = () => {
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
        renderComments();
        
      });
    }
  };
  likeButtonsPush();
  export default renderComments;
  export {likeButtonsPush}; 