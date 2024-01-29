const cardsContainer = document.querySelector(".cards__container");

const cardsData = [
    {
        title: "Din wallet",
        subtitle: "Din personlige portfolio",
        svgClass: "fa-solid fa-wallet",
        class: "card--wallet",
    },
    {
        title: "Din wallet",
        subtitle: "Din personlige portfolio",
        svgClass: "fa-solid fa-euro-sign",
        class: "card--valuta",
    },
    {
        title: "Køb crypto",
        subtitle: "Invest i dagens højeste kurs",
        svgClass: "fa-solid fa-bitcoin-sign",
        class: "card--crypto",
    },
    {
        title: "Se kurser",
        subtitle: "Følg kurserne på markedets coins",
        svgClass: "fa-solid fa-arrow-trend-up",
        class: "card--kurser",
    },
];

cardsData.forEach((card) => {
    cardsContainer.innerHTML += `
    <article class="card ${card.class}">
        <i class="${card.svgClass}"></i>
        <h2>${card.title}</h2>
        <p>${card.subtitle}</p>
    </article>`;
});
