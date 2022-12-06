document.addEventListener("submit", (e) => {
  e.preventDefault();
  const body = document.querySelector("#textarea").value;
  console.log(body);
  fetch(`/api/comments/:id`, {
    method: "POST",
    body: JSON.stringify( body ),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
      // location.reload();
    } else {
      alert("Cannot leave an empty comment!");
    }
  });
});
