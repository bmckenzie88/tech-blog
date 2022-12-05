async function newEventHandler(e) {
  const body = document.querySelector('textarea[name="comment-body"]').value;

  const res = await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({
      body,
      comment_creator,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      alert("Cannot leave an empty comment!");
    }
  });
}
