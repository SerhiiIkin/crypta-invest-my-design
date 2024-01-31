export default function SlideTempate(slide) {
    return (
        `<div>
            <img src="${slide.src}" alt="${slide.alt}">
            <div class="slide__title">${slide.description}</div>
        </div>`
    )

}