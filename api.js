const host = "https://webdev-hw-api.vercel.app/api/v2/roman-baranov/comments";
export function getComments({
  token
}) {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((resp) => {
    if (resp === 401) {
      throw new Error("Нет авторизации");
    }
    return resp.json();
  });
}

export function addComment({
  text,
  token
}) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text,
      // "text": textInputElement.value,
      // "name": nameInputElement.value,
      //   forceError: true,
    }),
    headers: {
      Authorization: token,
    },
  });
}

export function loginUser({
  login,
  password
}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400){
      throw new Error('неверный логин или пароль');
    }
    return response.json();
  });
}

export function regUser({
  login,
  password,
  name,
}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    if (response.status === 400){
      throw new Error('пользователь с таким логином уже сущетсвует');
    }
    return response.json();
  });
}