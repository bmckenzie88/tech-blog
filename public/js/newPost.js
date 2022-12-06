const newpostForm = document.getElementById("new-post-form");

newpostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("prevent default");

  const postObj = {
    title: document.querySelector(".title-input").value,
    body: document.querySelector(".body-input").value,
  };

  console.log(JSON.stringify(postObj));

  fetch("/api/posts/", {
    method: "POST",
    body: JSON.stringify(postObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("Post Creation failed");
        // location.reload();
      }
    })
    .then((data) => {
      location.href = `/users/${data.id}`;
    });
});
