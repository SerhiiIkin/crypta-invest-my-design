import "./js/BurgerMenu.js";
import Form from "./js/Form.js"
import Slider from "./js/Slider.js"
import "./js/Observer.js"


const config = {
    selector: ".my-slider",
    draggable: true,
    buttons: true,
    paggination: true,
    interval: 0,
    slidesPerView: 1,
    
};

const configFrom = {
    selector: ".form"
}

Slider(config)
Form(configFrom)