window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    var menu = document.querySelector(".menu");
        if (window.scrollY > 50) {
            header.classList.add("abajo");
            menu.classList.add("scrolled");
        } else {
            header.classList.remove("abajo");
            menu.classList.remove("scrolled");
        }
});

function scrollToTask() {
    const hash = window.location.hash;
    
    if (hash) {
        setTimeout(() => {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                const menuHeight = document.querySelector('.menu').offsetHeight;
                const divider = targetSection.querySelector('.section-divider');
                
                if (divider) {
                    const dividerPosition = divider.offsetTop - menuHeight - 20;
                    
                    window.scrollTo({
                        top: dividerPosition,
                        behavior: 'smooth'
                    });
                    const dividerText = divider.querySelector('.divider-text');
                    dividerText.style.color = '#b87c63';
                    dividerText.style.fontSize = '16px';
                    
                    setTimeout(() => {
                        dividerText.style.color = '';
                        dividerText.style.fontSize = '';
                    }, 1500);
                }
            }
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', scrollToTask);
window.addEventListener('hashchange', scrollToTask);

document.addEventListener('DOMContentLoaded', function() {
const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.appendChild(firstClone);
slide.insertBefore(lastClone, images[0]);

let counter = 1;
const size = images[0].clientWidth;
slide.style.transform = `translateX(${-size * counter}px)`;

let interval = setInterval(autoSlide, 5000);

function autoSlide() {
    if (counter >= images.length + 1) return;
    counter++;
    transitionSlide();
}

function transitionSlide() {
    slide.style.transition = "transform 0.5s ease-in-out";
    slide.style.transform = `translateX(${-size * counter}px)`;
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(autoSlide, 5000);
}

nextBtn.addEventListener('click', () => {
    if (counter >= images.length + 1) return;
    counter++;
    transitionSlide();
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    counter--;
    transitionSlide();
    resetInterval();
});

slide.addEventListener('transitionend', () => {
    if (images[counter - 1].id === 'last-clone') {
        slide.style.transition = "none";
        counter = 1;
        slide.style.transform = `translateX(${-size * counter}px)`;
    }

    if (images[counter - 1].id === 'first-clone') {
        slide.style.transition = "none";
        counter = images.length;
        slide.style.transform = `translateX(${-size * counter}px)`;
    }
});

window.addEventListener('resize', () => {
    slide.style.transition = "none";
    const newSize = images[0].clientWidth;
    slide.style.transform = `translateX(${-newSize * counter}px)`;
});
});

/* en teoria esto debe servir para que al momento de scrollear salga que tarea es y salga fijado */

function updateCurrentTaskIndicator() {
    const sections = document.querySelectorAll('[id^="tarea-"]');
    const menuHeight = document.querySelector('.menu').offsetHeight;
    const indicator = document.querySelector('.current-task-indicator');
    
    if (!indicator) return;
    
    let currentTask = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - menuHeight - 20;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            const dividerText = section.querySelector('.divider-text');
            if (dividerText) {
                currentTask = dividerText.textContent;
            } else {
                const sectionId = section.id;
                const h2 = section.querySelector('h2');
                
                if (sectionId) {
                    currentTask = "Tarea " + sectionId.replace('tarea-', '').replace(/-/g, '.');
                }
            }
        }
    });
    
    if (currentTask) {
        indicator.textContent = currentTask;
        indicator.style.display = 'block';
    } else {
        indicator.style.display = 'none';
    }
}

window.addEventListener('scroll', function() {
    var header = document.querySelector("header");
    var menu = document.querySelector(".menu");
    if (window.scrollY > 50) {
        header.classList.add("abajo");
        menu.classList.add("scrolled");
    } else {
        header.classList.remove("abajo");
        menu.classList.remove("scrolled");
    }
    
    updateCurrentTaskIndicator();
});

/* llama a la funcion */

document.addEventListener('DOMContentLoaded', function() {
    // Crea el elemento indicador si no existe
    if (!document.querySelector('.current-task-indicator')) {
        const indicator = document.createElement('div');
        indicator.className = 'current-task-indicator';
        indicator.style.display = 'none';
        document.body.appendChild(indicator);
    }
    
    updateCurrentTaskIndicator();
});
