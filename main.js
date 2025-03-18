
    // some js for icon menu
let activeMenu = document.querySelectorAll("#left-menu li a");
function active(){
    for( act of activeMenu){
        act.classList.remove("active-menu");
    }
   event.currentTarget.classList.add("active-menu");
}
    // Form validation script 
const scriptURL = 'https://script.google.com/macros/s/AKfycbzCX4CW7wN5MuwDhSQecXW6WHr5VwlH2jpdslKuXGnBAghSnKqs6ZYPqF8iS-lZtvnQDQ/exec'
  const form = document.forms['submit-to-google-sheet']
    const sentMsg = document.getElementById("success");

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        sentMsg.innerHTML = "Message Sent Successfully";
        setTimeout(() => {
            sentMsg.innerHTML = "";
        }, 3000);
        form.reset();
      }
      )
      .catch(error => console.error('Error!', error.message))
  })