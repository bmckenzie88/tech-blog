const deletePostbutton = document.querySelector(".delete-button");

deletePostbutton.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('prevent default');
    
  
    fetch("/api/posts/", {
      method: "DELETE",
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