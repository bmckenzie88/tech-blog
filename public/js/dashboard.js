const newPostButton = document.querySelector(".new-post-button");
const deletePostButton = document.querySelectorAll(".delete-button");

newPostButton.addEventListener("submit", (e) => {
  e.preventDefault();

  const newPost = {
    title: document.querySelector("#post-title").value,
    body: document.querySelector("#post-body").value,
  };

  console.log(JSON.stringify(newPost));

  fetch("/api/posts/", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        document.location.reload();
        return res.json();
      } else {
        return res.json();
      }
    })
    .then((data) => {
      location.href = `/users/${data.id}`;
    });
});

deletePostButton.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const postId = e.target.getAttribute("data-postId");
    console.log("prevent default");
    console.log(postId);

    fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        location.reload();
        return res.json();
      } else {
        return res.json();
      }
    });
  });
});
