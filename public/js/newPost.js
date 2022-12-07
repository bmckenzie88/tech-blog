const newPostForm = document.getElementById("new-post-form");

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("prevent default");

  const postObj = {
    title: document.querySelector(".post-title").value,
    body: document.querySelector(".post-body").value,
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
        alert("Post creation failed");
      }
    })
    .then((data) => {
      location.replace(`/users/${data.post_creator}`);
    });
});
