const cards = document.querySelectorAll(".card");
const form = document.querySelector(".form");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    },
    {
        threshold: 0.5,
        rootMargin: "-50px",
    }
);

const formObserver = new IntersectionObserver(
    (entries) => {
        entries[0].target.classList.toggle("show", entries[0].isIntersecting);
    },
    {
        threshold: 0.5,
        
    }
);

cards.forEach((card) => {
    observer.observe(card);
});

formObserver.observe(form);
