// small interactive bits
document.getElementById('year').innerText = new Date().getFullYear();

function handleForm(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Simple client-side "send" simulation. Replace with your serverless function or form endpoint.
  const payload = { name, email, message, to: "devdesagar@gmail.com" };
  console.log('contact payload', payload);

  // show animated success
  const button = document.querySelector('.contact-form button');
  button.innerText = 'Sending…';
  setTimeout(()=>{
    button.innerText = 'Sent ✓';
    button.disabled = true;
  }, 900);

  return false;
}
