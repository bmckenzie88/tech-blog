document.addEventListener("submit", (e) => {
  e.preventDefault();
  const commentObj = {
    body: document.querySelector(".comment-body").value,
  }
  console.log(commentObj);

  console.log(JSON.stringify(commentObj));

  fetch(`/api/comments${location.pathname}`, {
    method: "POST",
    body: JSON.stringify(commentObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        location.reload();
        return res.json();
      } else {
        console.log(commentObj);
        alert("Comment creation failed");
      }
    })
    .then((data) => {
      console.log(data);
    });
});

