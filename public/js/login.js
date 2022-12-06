const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userObj = {
    username: document.querySelector("#username-login").value,
    password: document.querySelector("#password-login").value,
  };

  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("Login failed");
        location.reload();
      }
    })
    .then((data) => {
      location.href = `/users/${data.id}`;
    });
});
