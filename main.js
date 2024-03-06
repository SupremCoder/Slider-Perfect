const slider = document.querySelector(".slider"),
    firstImg = slider.querySelectorAll("img")[0],
    buttons = document.querySelectorAll(".wrapper button");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = slider.scrollWidth - slider.clientWidth;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        slider.scrollLeft += button.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // 
    });
});

const autoSlide = () => {
    if (slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if (slider.scrollLeft > prevScrollLeft) {
        return slider.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    slider.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slider.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    slider.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
slider.addEventListener("touchend", dragStop);