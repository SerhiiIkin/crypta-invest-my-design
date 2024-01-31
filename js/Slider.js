import { sliderData } from "./SliderData.js";
import SlideTempate from "./SlideTmplate.js";

export default function Slider({
    selector,
    draggable,
    buttons,
    paggination,
    interval,
    slidesPerView = 1,
    breakpoints,
    effect,
}) {
    const slider = document.querySelector(selector);
    const container = slider.querySelector("div");
    const wrapper = container.querySelector("div");
    const slides = wrapper.children;
    const slideNummer = container.querySelector(".slideNummer");

    window.addEventListener("keyup", (e) => {
        clearIntervalSlide();
        e.key === "ArrowLeft" ? changeSlide("left") : changeSlide("right");
        checkInterval();
    });

    const startSlides = [...slides];
    const startSlidesLength = slides.length;

    let isDragging = false;
    let startX;
    let deltaX;
    let currentSlide = 0;
    let sInterval;
    const ACTIVE = "active";
    const SHOW = "show";

    changeSlideNummer(currentSlide);

    function changeSlideNummer(currentSlide) {
        slideNummer.textContent = `${currentSlide + 1} udaf  ${
            sliderData.length
        }`;
    }

    sliderData.forEach((slide) => (wrapper.innerHTML += SlideTempate(slide)));

    addClasses();

    buttons && createBtns();
    paggination && createPaggination();
    interval && checkInterval();
    if (draggable && !effect) {
        container.classList.add("draggable");

        container.addEventListener("mousedown", startDrag);
        container.addEventListener("touchstart", startDrag);
    }

    if (!effect) {
        wrapper.insertBefore(slides[slides.length - 1], slides[0]);
        wrapper.style.transform = `translateX(-100%)`;
    }
    if (effect === "cube") {
        wrapper.insertBefore(slides[slides.length - 1], slides[0]);
    }

    slidesPerView > 1 && wrapSlide(slidesPerView);
    if (breakpoints) {
        for (let i = 0; i < Object.keys(breakpoints).length; i++) {
            const points = Object.entries(breakpoints)[i];
            if (+points[0] <= window.innerWidth) {
                slidesPerView = points[1].slidesPerView;
                wrapSlide(slidesPerView);
            }
        }
    }

    let slideHeight = [...slides].reduce((a, b) =>
        a.offsetHeight > b.offsetHeight ? a.offsetHeight : b.offsetHeight
    );

    container.style.height = slideHeight + 80 + "px";

    window.addEventListener("resize", (e) => {
        const outerWidth = e.target.outerWidth;
        slideHeight = [...slides].reduce((a, b) =>
            a.offsetHeight > b.offsetHeight ? a.offsetHeight : b.offsetHeight
        );
        container.style.height = slideHeight + 80 + "px";

        if (breakpoints) {
            Object.entries(breakpoints).forEach((point) => {
                if (
                    +point[0] - 20 <= outerWidth &&
                    outerWidth <= +point[0] + 20
                ) {
                    slidesPerView = point[1].slidesPerView;
                    wrapSlide(slidesPerView);
                }
            });
        }
    });

    function createBtns() {
        const btnLeft = document.createElement("button");
        btnLeft.setAttribute("type", "button");
        const btnRight = btnLeft.cloneNode(true);
        container.append(btnRight);
        container.append(btnLeft);
        btnLeft.classList.add("slider-btn__left");
        btnRight.classList.add("slider-btn__right");

        btnRight.addEventListener("click", () => changeSlide("right"));
        btnLeft.addEventListener("click", () => changeSlide("left"));
    }

    function createPaggination() {
        const containerPagination = document.createElement("div");

        containerPagination.classList.add("pagination");
        container.append(containerPagination);

        for (let i = 0; i < slides.length; i++) {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.classList.add("pagination__btn");
            button.textContent = `${i + 1}`;
            containerPagination.append(button);
            button.addEventListener("click", () => goToSlide(i));
        }

        highlightPagination();
    }

    function reCreatePagination() {
        const containerPagination = container.querySelector(".pagination");
        const pagginationArray = [];
        for (let i = 0; i < slides.length; i++) {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.classList.add("pagination__btn");
            button.textContent = `${i + 1}`;
            pagginationArray.push(button);
            button.addEventListener("click", () => goToSlide(i));
        }
        currentSlide = 0;
        containerPagination.replaceChildren(...pagginationArray);
        highlightPagination();
    }

    function goToSlide(index) {
        changeSlideNummer(index)
        clearIntervalSlide();
        const totalSlides = slides.length;
        const stepsForward = (index - currentSlide + totalSlides) % totalSlides;
        const stepsBackward =
            (currentSlide - index + totalSlides) % totalSlides;

        const steps =
            stepsForward <= stepsBackward ? stepsForward : -stepsBackward;

        if (steps > 0) {
            if (!effect) {
                wrapper.style.translate = `${-100 * steps}% `;
                wrapper.style.transition = `translate 1s ease-in-out`;

                setTimeout(() => {
                    wrapper.style.transition = "none";
                    wrapper.style.translate = `none`;

                    for (let i = 0; i < steps; i++) {
                        wrapper.appendChild(
                            wrapper.firstElementChild.cloneNode(true)
                        );
                        wrapper.removeChild(wrapper.firstElementChild);
                        currentSlide = (currentSlide + 1) % slides.length;
                        highlightPagination();
                    }
                }, 1001);
            } else {
                for (let i = 0; i < steps; i++) {
                    changeSlide("right");
                }
            }
        } else {
            if (!effect) {
                wrapper.style.translate = `${100 * steps}% `;

                for (let i = 0; i < -steps; i++) {
                    wrapper.insertBefore(
                        wrapper.children[
                            wrapper.children.length - i - 1
                        ].cloneNode(true),
                        wrapper.firstElementChild
                    );
                }

                void wrapper.offsetWidth;

                wrapper.style.transition = `translate 1s ease-in-out`;
                wrapper.style.translate = `none`;

                for (let i = 0; i < -steps; i++) {
                    wrapper.removeChild(wrapper.lastElementChild);
                }

                for (let i = 0; i < -steps; i++) {
                    currentSlide =
                        (currentSlide - 1 + slides.length) % slides.length;
                    highlightPagination();
                }
                setTimeout(() => {
                    wrapper.style.transition = "none";
                }, 1001);
            } else {
                changeSlide("left");
            }
        }

        checkInterval();
    }

    function highlightPagination() {
        const pagination = container.querySelector(".pagination");
        const paginationButtons = [...pagination.children];
        const currentBtn = paginationButtons[currentSlide];
        let secondBreakPoint;
        if (breakpoints) {
            secondBreakPoint = Object.keys(breakpoints)[1];
        }

        if (paginationButtons.length < 7) {
            if (currentBtn) {
                paginationButtons.forEach((btn, index) => {
                    btn.classList.remove(ACTIVE);
                    if (index != 0 && index != paginationButtons.length - 1) {
                        btn.classList.remove(SHOW);
                    }
                });

                currentBtn.classList.add(ACTIVE);
                currentBtn.classList.add(SHOW);

                currentBtn.nextSibling &&
                    currentBtn.nextSibling.classList.add(SHOW);
                currentBtn.previousSibling &&
                    currentBtn.previousSibling.classList.add(SHOW);
            }
        } else {
            paginationButtons.forEach((btn, index) => {
                btn.classList.remove(ACTIVE);
                if (index != 0 && index != paginationButtons.length - 1) {
                    btn.classList.add("hide");
                }
            });

            currentBtn.classList.add(ACTIVE);
            currentBtn.classList.remove("hide");

            if (currentBtn.nextSibling) {
                currentBtn.nextSibling.classList.remove("hide");
            }
            if (currentBtn.previousSibling) {
                currentBtn.previousSibling.classList.remove("hide");
            }

            if (window.innerWidth < secondBreakPoint) {
                currentBtn.classList.remove("right-points");
                currentBtn.classList.remove("left-points");
                if (
                    currentSlide >= 3 &&
                    currentSlide <= paginationButtons.length - 4
                ) {
                    currentBtn.nextSibling.classList.add("right-points");
                    currentBtn.previousSibling.classList.add("left-points");
                    currentBtn.previousSibling.classList.remove("right-points");
                } else if (currentSlide < 3) {
                    if (currentBtn.nextSibling) {
                        currentBtn.nextSibling.classList.add("right-points");
                    }
                    if (currentBtn.previousSibling) {
                        currentBtn.previousSibling.classList.remove(
                            "right-points"
                        );
                    }
                } else if (currentSlide >= paginationButtons.length - 4) {
                    currentBtn.previousSibling.classList.add("left-points");
                }
            }
        }
    }

    function startDrag(e) {
        clearIntervalSlide();
        isDragging = true;
        startX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;

        document.addEventListener("mousemove", drag);
        document.addEventListener("touchmove", drag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
    }

    function drag(e) {
        if (!isDragging) return;
        const x = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
        deltaX = x - startX;
        wrapper.style.translate = `${deltaX}px`;
    }

    function stopDrag(e) {
        if (!isDragging) return;

        isDragging = false;
        const endX = e.type.startsWith("touch")
            ? e.changedTouches[0].clientX
            : e.clientX;

        document.removeEventListener("mousemove", drag);
        document.removeEventListener("touchmove", drag);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchend", stopDrag);

        if (Math.abs(startX - endX) > 100) {
            if (startX < endX) {
                changeSlide("left");
            } else if (startX > endX) {
                changeSlide("right");
            }
        } else {
            wrapper.style.translate = "none";
        }
        checkInterval();
    }

    function changeSlide(direction) {

        clearIntervalSlide();
        if (!effect) {
            wrapper.style.transition = "translate 1s ease-in-out";
            direction === "left" &&
                (wrapper.style.translate = `${container.offsetWidth}px`);
            direction === "right" &&
                (wrapper.style.translate = `${-container.offsetWidth}px`);

            setTimeout(() => {
                wrapper.style.translate = "none";
                wrapper.style.transition = "none";

                if (direction === "left") {
                    wrapper.insertBefore(
                        wrapper.lastElementChild.cloneNode(true),
                        wrapper.firstElementChild
                    );
                    wrapper.removeChild(wrapper.lastElementChild);
                    currentSlide =
                        (currentSlide - 1 + slides.length) % slides.length;
                    changeSlideNummer(currentSlide)
                } else {
                    wrapper.appendChild(
                        wrapper.firstElementChild.cloneNode(true)
                    );
                    wrapper.removeChild(wrapper.firstElementChild);
                    currentSlide = (currentSlide + 1) % slides.length;
                    changeSlideNummer(currentSlide)
                }

                highlightPagination();
            }, 1001);
        } else {
            if (direction === "left") {
                wrapper.insertBefore(
                    wrapper.lastElementChild.cloneNode(true),
                    wrapper.firstElementChild
                );
                wrapper.removeChild(wrapper.lastElementChild);
                currentSlide =
                    (currentSlide - 1 + slides.length) % slides.length;
                    changeSlideNummer(currentSlide)
            } else {
                wrapper.appendChild(wrapper.firstElementChild.cloneNode(true));
                wrapper.removeChild(wrapper.firstElementChild);
                currentSlide = (currentSlide + 1) % slides.length;
                changeSlideNummer(currentSlide)
            }

            highlightPagination();
        }

        checkInterval();
    }

    function checkInterval() {
        interval >= 2000 && !isNaN(interval)
            ? startIntervalSlide()
            : clearIntervalSlide();
    }

    function startIntervalSlide() {
        sInterval = setInterval(() => {
            wrapper.style.translate = `${-100}%`;
            changeSlide("right");
        }, interval);
    }

    function clearIntervalSlide() {
        clearInterval(sInterval);
    }

    function wrapSlide(slidesPerView) {
        let j = 0;
        if (slidesPerView > 1) {
            const newSlides = [];
            for (
                let i = 0;
                i < Math.ceil(startSlidesLength / slidesPerView);
                i++
            ) {
                const div = document.createElement("div");
                for (let index = 0; index < slidesPerView; index++) {
                    if (startSlides[j + index]?.dataset.index !== undefined) {
                        div.append(startSlides[j + index].cloneNode(true));
                    }
                }
                j += slidesPerView;
                newSlides.push(div);
            }

            wrapper.replaceChildren(...newSlides);

            newSlides.forEach((slide) => {
                slide.classList.add("slide-wrapper");
                [...slide.children].forEach(
                    (s) => (s.style.flex = `0 0 ${100 / slidesPerView}%`)
                );
            });

            wrapper.insertBefore(slides[slides.length - 1], slides[0]);
            wrapper.style.transform = `translateX(-100%)`;
            reCreatePagination();
        } else {
            wrapper.replaceChildren(...startSlides);

            wrapper.insertBefore(slides[slides.length - 1], slides[0]);
            wrapper.style.transform = `translateX(-100%)`;
            reCreatePagination();
        }
    }

    function addClasses() {
        slider.classList.value = `slider ${slider.classList.value}`;
        container.classList.value = `slider__container ${container.classList.value}`;
        wrapper.classList.value = `slider__wrapper ${wrapper.classList.value}`;

        switch (effect) {
            case "card":
                wrapper.classList.add("card");
                break;
            case "cube":
                wrapper.classList.add("cube");
                break;

            default:
                break;
        }

        [...slides].forEach((slide, index) => {
            slide.classList.value = `slide ${slide.classList.value}`;
            slide.setAttribute("data-index", index);

            switch (effect) {
                case "card":
                    slide.classList.add("card", "hide");
                    break;
                case "cube":
                    slide.classList.add("cube", "hide");
                    break;

                default:
                    break;
            }
        });
    }
}
