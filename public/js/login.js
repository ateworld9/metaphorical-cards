const LoginForm = document.getElementById('LoginForm')

LoginForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const userEmail = document.getElementById('userEmail')
  const userPassword = document.getElementById('userPassword');
  const resp = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userEmail: userEmail.value,
      userPassword: userPassword.value
    })
  })
  const respose = await resp.json()
  console.log(respose);
  window.location.assign(`/`);
})
