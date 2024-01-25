const form = document.querySelector(".form");
const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const nameInput = e.target.querySelector(".form__name");
    const mailInput = e.target.querySelector(".form__email");

    if (nameInput.value.length >= 3 && patternEmail.test(mailInput.value)) {
        alert("form is valid, data can be send");
    } else {
        alert("form is not valid");
    }
}
