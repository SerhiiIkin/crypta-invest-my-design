export default function SlideTempate(slide) {
    return `<div>
            <img src="${slide.src}" alt="${slide.alt}">
            <div class="slide__title">${
                slide.description
            } <a target="_blank" class="slide__link" href="${
        slide.link
    }">${slide.link.slice(7, slide.link.length)}</a></div>
        </div>`;
}
