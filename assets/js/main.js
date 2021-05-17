function isVisible(elem) {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
}

function set_xp(element, percent, time = 0) {
    setTimeout(function() {
        let elemento = document.getElementById(element);
        let xp = elemento.getElementsByClassName("porcentage")[0];
        xp.style.width = percent;
    }, time);
}

function viewValue() {
    set_xp("figma-xp", "40%", 100);
    set_xp("adobeXD-xp", "40%", 200);
    set_xp("html-xp", "60%", 300);
    set_xp("css-xp", "60%", 400);
    set_xp("bootstrap-xp", "50%", 500);
    set_xp("js-xp", "30%", 600);
}

function closeValue() {
    set_xp("figma-xp", "0%", 100);
    set_xp("adobeXD-xp", "0%", 200);
    set_xp("html-xp", "0%", 300);
    set_xp("css-xp", "0%", 400);
    set_xp("bootstrap-xp", "0%", 500);
    set_xp("js-xp", "0%", 600);
}
window.onscroll = function() {
    if (isVisible(document.getElementById("soft-skills"))) {
        viewValue();
    } else {
        closeValue();
    }
}

// Navbar animation js

function navbarNavigation() {
    const btnOpen = document.querySelector('.btnOpen');
    const btnClose = document.querySelector('.btnClose');
    const responsiveNavbar = document.querySelector('.navbar-responsive .content-navbar');
    btnOpen.addEventListener('click', function() {
        responsiveNavbar.classList.add('active');
    });

    btnClose.addEventListener('click', function() {
        responsiveNavbar.classList.remove('active');
    });
}

navbarNavigation();

// Close hours 

const btnCloseHours = document.querySelector('#close-hours')
btnCloseHours.addEventListener('click', function() {
    const boxHours = document.querySelector('.box-hours');
    boxHours.classList.add('close');
});

// Input verify animation 

const textModal = document.querySelector('.text-Modal');
const modalAlert = document.querySelector('.modal-alert');

function modalAcept() {
    modalAlert.classList.add('alert');
    modalAlert.classList.add('active');
    setTimeout(function() {
        modalAlert.classList.remove('alert');
        modalAlert.classList.remove('active');
    }, 3000);
    textModal.textContent = 'Feedback enviado com sucesso';
    setTimeout(function() {
        form.submit();
    }, 3500);
}

function modalError() {
    modalAlert.classList.add('alert');
    setTimeout(function() {
        modalAlert.classList.remove('alert');
    }, 3000);
    textModal.textContent = 'Preencha todos os dados';
}

function send() {
    const btnSend = document.querySelector('.btn-send');
    btnSend.addEventListener('click', function() {
        const input = document.querySelectorAll('.analytic-input');
        let nonEmptys = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i].value.length !== 0) {
                nonEmptys++;
            }
        }
        if (nonEmptys == input.length) {
            modalAcept();
        } else {
            modalError();
        }
    });
}

send();

// Welcome website hours

function getDateTime() {
    // Get date
    const getDate = new Date();
    const day = format(getDate.getDate());
    const month = format(getDate.getMonth() + 1);
    const year = (getDate.getFullYear());
    // Get time 
    const hours = format(getDate.getHours());
    const minutes = format(getDate.getMinutes());
    const seconds = format(getDate.getSeconds());
    const dateText = document.querySelector('.date');
    const hoursText = document.querySelector('.hours');
    dateText.innerHTML = `Data atual: ${day}/${month}/${year}`;
    hoursText.innerHTML = `Hora atual: ${hours}:${minutes}:${seconds}`
};

function format(num) {
    return (num < 10 ? '0' + num : num);
};

setInterval(getDateTime, 0);