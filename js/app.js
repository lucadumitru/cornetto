(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const circularSlider = document.querySelector(".circular-slider__wrapper");
    const slides = document.querySelectorAll(".circular-slider__slide");
    const buttonLeft = document.querySelector(".circular-slider__button_left");
    const buttonRight = document.querySelector(".circular-slider__button_right");
    const script_images = document.querySelectorAll(".circular-slider__slide img");
    const activeSlideImage = document.querySelector(".circular-slider__active-slide img");
    const contentButton = document.querySelector(".page__button");
    const titleSpan = document.querySelector(".page__title span");
    const logoText = document.querySelector(".header__logo span");
    const logoIcon = document.querySelector(".logo__icon");
    const circle = document.querySelector(".circular-slider__circle");
    const menuBody = document.querySelector(".menu__body");
    let rotationAngle = 0;
    let angleStep = 360 / slides.length;
    let currentEl, nextEl, prevEl;
    function handleButtonLeftClick() {
        script_images.forEach(((img, i) => {
            let angle = -rotationAngle - i * (360 / script_images.length);
            img.style.transform = `rotate(${angle}deg) scale(0.6)`;
            if (img.classList.contains("active")) {
                currentEl = img;
                nextEl = script_images[i + 1];
                if (i + 1 == script_images.length) nextEl = script_images[0];
            }
        }));
        currentEl.classList.remove("active");
        nextEl.classList.add("active");
        rotationAngle -= angleStep;
        circularSlider.style.transform = `rotate(${rotationAngle}deg)`;
        activeSlideImage.src = nextEl.src;
        titleSpan.textContent = nextEl.getAttribute("name");
        changeAccentColor(nextEl);
    }
    function handleButtonRightClick() {
        rotationAngle += angleStep;
        circularSlider.style.transform = `rotate(${rotationAngle}deg)`;
        script_images.forEach(((img, i) => {
            let angle = -rotationAngle - i * (360 / script_images.length) - angleStep;
            img.style.transform = `rotate(${angle}deg) scale(0.6)`;
            if (img.classList.contains("active")) {
                prevEl = script_images[i - 1];
                if (i - 1 == -1) prevEl = script_images[script_images.length - 1];
                currentEl = img;
            }
        }));
        currentEl.classList.remove("active");
        prevEl.classList.add("active");
        activeSlideImage.src = prevEl.src;
        titleSpan.textContent = prevEl.getAttribute("name");
        changeAccentColor(prevEl);
    }
    function changeAccentColor(el) {
        contentButton.style.backgroundColor = `#${el.dataset.color}`;
        buttonLeft.style.backgroundColor = `#${el.dataset.color}`;
        buttonRight.style.backgroundColor = `#${el.dataset.color}`;
        menuBody.style.setProperty("--color", `#${el.dataset.color}`);
        circle.style.backgroundColor = `#${el.dataset.color}`;
        const observer = new ResizeObserver((entries => {
            for (let entry of entries) {
                const {width, height} = entry.contentRect;
                if (width > 767) {
                    logoText.style.setProperty("--color", `#${el.dataset.color}`);
                    logoIcon.style.setProperty("--color", `#${el.dataset.color}`);
                }
            }
        }));
        observer.observe(document.documentElement);
    }
    buttonLeft.addEventListener("click", handleButtonLeftClick);
    buttonRight.addEventListener("click", handleButtonRightClick);
    window["FLS"] = true;
    isWebp();
    menuInit();
})();