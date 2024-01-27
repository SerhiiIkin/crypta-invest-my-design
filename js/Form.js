function Form({ selector }) {
    const form = document.querySelector(selector);
    const inputs = form.querySelectorAll("input");
    const resetBtn = form.querySelector("button[type=reset]");
    const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const error = document.createElement("div");
    error.classList.add("error");
    const textArea = form.querySelector("textarea");

    const dataForm = {};

    resetBtn &&
        resetBtn.addEventListener("click", () => {
            inputs.forEach((input) => {
                input.classList.remove("invalid");
                input.nextElementSibling && input.nextElementSibling.remove();
            });
        });

    form.addEventListener("submit", submitHandler);
    inputs.forEach((input) => {
        input.addEventListener("input", inputHandler);
        input.addEventListener("focusout", inputFocusOut);
    });

    function checkEmailInput(target) {
        if (patternEmail.test(target.value)) {
            target.nextElementSibling && target.nextElementSibling.remove();
            target.classList.remove("invalid");
        } else if (!patternEmail.test(target.value)) {
            error.textContent = "invalid email";
            target.classList.add("invalid");
            !target.nextElementSibling &&
                target.insertAdjacentElement("afterend", error.cloneNode(true));
        }
    }

    function checkTextInput(target) {
        if (target.value.length > 2) {
            target.nextElementSibling && target.nextElementSibling.remove();
            target.classList.remove("invalid");
        } else {
            error.textContent = "too short";
            !target.nextElementSibling &&
                target.insertAdjacentElement("afterend", error.cloneNode(true));
            target.classList.add("invalid");
        }
    }

    function inputFocusOut(e) {
        const isEmailInput = e.target.getAttribute("name") === "email";
        isEmailInput ? checkEmailInput(e.target) : checkTextInput(e.target);
    }

    function inputHandler(e) {
        const isEmailInput = e.target.getAttribute("name") === "email";
        isEmailInput ? checkEmailInput(e.target) : checkTextInput(e.target);
    }

    function submitHandler(e) {
        e.preventDefault();

        inputs.forEach((input) => {
            dataForm[input.getAttribute("name")] = input.value;
            const isEmailInput = input.getAttribute("name") === "email";

            isEmailInput ? checkEmailInput(input) : checkTextInput(input);
        });
        dataForm[textArea.getAttribute("name")] = textArea.value;

        const isErrors = e.target.querySelectorAll(".error");

        isErrors.length === 0
            ? console.table(dataForm)
            : console.error("cant send data");
    }
}

export default Form;
