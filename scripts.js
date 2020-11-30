/*=====================scroll header menu, links-anchors===================*/
const links = document.querySelectorAll('.link');
const sections = document.querySelectorAll('section');

function changeLinkState() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop - 97) {
    }

    links.forEach((link) => link.classList.remove('active'));
    links[index].classList.add('active');
}

// changeLinkState();
window.addEventListener('scroll', changeLinkState);
/*========================header,navigation menu=======================*/

/*=============================slider-move============================*/
(function() {
    "use strict";

    function Carousel(setting) {
        if(document.querySelector(setting.wrap) === null) {
            console.error(`Carousel not fount selector ${setting.wrap}`);
            return;
        }

        /* Scope privates methods and properties */
        let privates = {};


        /* Public methods */
        // Prev slide
        this.prev_slide = () => {
            --privates.opt.position;

            if(privates.opt.position < 0) {
                privates.sel.wrap.classList.add('s-notransition');
                privates.opt.position = privates.opt.max_position - 1;
            }

            privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
        };


        // Next slide
        this.next_slide = () => {
            ++privates.opt.position;

            if(privates.opt.position >= privates.opt.max_position) {
                privates.opt.position = 0;
            }

            privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
        };



        /* Privates properties */
        privates.setting = setting;

        privates.sel = {
            "main": document.querySelector(privates.setting.main),
            "wrap": document.querySelector(privates.setting.wrap),
            "children": document.querySelector(privates.setting.wrap).children,
            "prev": document.querySelector(privates.setting.prev),
            "next": document.querySelector(privates.setting.next)
        };

        privates.opt = {
            "position": 0,
            "max_position": document.querySelector(privates.setting.wrap).children.length
        };

        // Control
        if(privates.sel.prev !== null) {
            privates.sel.prev.addEventListener('click', () => {
                this.prev_slide();
            });
        }

        if(privates.sel.next !== null) {
            privates.sel.next.addEventListener('click', () => {
                this.next_slide();
            });
        }

    }

    let run = new Carousel({
        "wrap": ".slider__wrap",
        "prev": ".slider__arrow-left",
        "next": ".slider__arrow-right",
        "touch": true,
    });
})();

/*===========================portfolio tabs==================*/

function display_random_image() {
    const images = [...document.getElementsByClassName('portfolio__image')];
    const imageSrcs = images.map(img => img.src);
    shuffleArray(imageSrcs);
    for (let i = 0; i < images.length; i++) {
        images[i].src = imageSrcs[i];
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}