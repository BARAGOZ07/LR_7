
"use strict";

// Получаем элементы страницы
const slider = document.getElementById("slider");
const viewport = document.querySelector(".viewport");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const pageNumbers = document.getElementById("pageNumbers");
const pageInfo = document.getElementById("pageInfo");

// Количество изображений
const totalImages = slider.children.length;

// Текущая страница
let currentPage = 0;

// Количество изображений на одной странице
let imagesPerPage = 3;

// Общее количество страниц
let totalPages = 0;

// Определяем количество изображений на экране
function updateSettings() {

    if (window.innerWidth <= 600) {
        imagesPerPage = 1;
    } else {
        imagesPerPage = 3;
    }

    totalPages = Math.ceil(totalImages / imagesPerPage);

    if (currentPage >= totalPages) {
        currentPage = totalPages - 1;
    }

    createPager();
    updateSlider();
}

// Создаем кнопки пейджера
function createPager() {

    pageNumbers.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {

        const button = document.createElement("button");

        button.className = "page-button";
        button.textContent = i + 1;
        button.type = "button";
        button.setAttribute("aria-label", "Страница " + (i + 1));

        button.addEventListener("click", function () {
            currentPage = i;
            updateSlider();
        });

        pageNumbers.appendChild(button);
    }
}

// Обновляем положение слайдера
function updateSlider() {

    const offset = currentPage * viewport.clientWidth;

    slider.style.transform = "translateX(-" + offset + "px)";

    // Обновляем информацию о странице
    pageInfo.textContent =
        "Страница " + (currentPage + 1) + " из " + totalPages;

    // Обновляем активную кнопку
    const buttons = pageNumbers.children;

    for (let i = 0; i < buttons.length; i++) {

        buttons[i].classList.toggle(
            "active",
            i === currentPage
        );
    }

    // Блокируем стрелки на крайних страницах
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
}

// Переход на предыдущую страницу
prevButton.addEventListener("click", function () {

    if (currentPage > 0) {
        currentPage--;
        updateSlider();
    }
});

// Переход на следующую страницу
nextButton.addEventListener("click", function () {

    if (currentPage < totalPages - 1) {
        currentPage++;
        updateSlider();
    }
});

// Пересчет при изменении размера окна
window.addEventListener("resize", updateSettings);

// Запуск галереи
updateSettings();
