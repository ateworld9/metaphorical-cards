
const doThis = document.getElementById('regForm');

  doThis.addEventListener('submit', async (even) => {
    even.preventDefault();
    console.log(event.target.userName.value);
  
    const response = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: even.target.userName.value,
        userPassword: even.target.userPassword.value,
        userEmail: even.target.userEmail.value,
      }),
    });
    console.log(response);
    if (response.url) {
      
      window.location.href = response.url;
    }
  })
  

