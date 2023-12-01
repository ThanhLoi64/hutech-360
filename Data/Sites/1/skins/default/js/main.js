$(function() {
    APP.init();

    // init
    swiperInit();
    bindFancybox();

    accordionInit();
    minutesTabInit();
    tabsletCustom();

    // cookie
    checkMasterPlanCookie();

    triggerMaterPlan();
    // $('.tooltip[data-tooltip-content="#tooltip-2612"]').mouseover()
    // set height
    setTimeout(() => {
        height($('.about-5 .main-slide .item'))
    }, 1000);
});

$(window).on('scroll', function() {
    APP.fixed();
});

// variable
var header = $("header");
var backToTop = $(".btn-back-to-top");
var heightHeader = $("header").height();
console.log("🚀 ~ file: main.js ~ line 16 ~ heightHeader", heightHeader)
var heightWindow = $(window).height();
var outerHeightWindow = $(window).outerHeight();
console.log("🚀 ~ file: main.js ~ line 17 ~ heightWindow", heightWindow)
console.log("🚀 ~ file: main.js ~ line 33 ~ outerHeightWindow", outerHeightWindow)
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1,
};

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
            get: function() {
                supportsPassive = true;
            },
        })
    );
} catch (e) {}

var wheelOpt = supportsPassive ? {
    passive: false
} : false;
var wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// call this to Disable
function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}


// toggleText
$.fn.extend({
    toggleText: function(a, b) {
        return this.text(this.text() == b ? a : b);
    },
});

var APP = {
    fixed: () => {
        // header
        $(window).scrollTop() > heightHeader ?
            header.addClass("active") :
            header.removeClass("active");
        $(window).scrollTop() > (outerHeightWindow - heightHeader) ?
            backToTop.addClass("active") :
            backToTop.removeClass("active");
    },
    mapping: () => {
        let mainMenu = $("header .navbar-nav").mapping({
            mobileWrapper: "header .mobile-wrap",
            mobileMethod: "prependTo",
            desktopWrapper: "header .button-consortium",
            desktopMethod: "insertBefore",
            breakpoint: 1279.98,
        });
        let social = $("header .navbar-social").mapping({
            mobileWrapper: "header .mobile-wrap",
            mobileMethod: "appendTo",
            desktopWrapper: "header .header-left",
            desktopMethod: "prependTo",
            breakpoint: 1279.98,
        });
        // home Plan
        let imagePlan = $(".home-ground-plan .image-maps").mapping({
            mobileWrapper: ".home-ground-plan .image-maps-mobile",
            mobileMethod: "appendTo",
            desktopWrapper: ".home-ground-plan .image-maps-pc",
            desktopMethod: "appendTo",
            breakpoint: 767.98,
        });
        // home Footer
        // let homeFooter = $(".homepage footer").mapping({
        // 	mobileWrapper: ".homepage main",
        // 	mobileMethod: "insertAfter",
        // 	desktopWrapper: ".home-fake-footer-section",
        // 	desktopMethod: "appendTo",
        // 	breakpoint: 1279.98,
        // });
    },
    toggleMenu: () => {
        let btnMenu = $("#buttonMenu"),
            mobileWrap = $("header .mobile-wrap");
        btnMenu.on("click", function() {
            $(this).toggleClass("open");
            mobileWrap.toggleClass("open");
            mobileWrap.hasClass("open") ? disableScroll() : enableScroll();
        });
    },
    backToTop: () => {
        backToTop.on("click", function() {
            $('html, body').animate({
                scrollTop: 0,
            }, 0)
        });
        $('.cta-button .btn-register').on("click", function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $('footer').offset().top - heightHeader,
            }, 0)
        });
    },
    sourceInfo: () => {
        console.log(
            "%cTHE CLASSIA",
            "font-size:100px;color:#f1836b;text-shadow:0 1px 0 #ecc09a,0 2px 0 #ecc09a ,0 3px 0 #ecc09a ,0 4px 0 #ecc09a ,0 5px 0 #ecc09a ,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);"
        );
        console.log(
            "%c The Classia %c - The Classia in Viet Nam",
            "border-radius: 2px; padding: 3px; background: #f1836b; color: #000",
            "color: #f1836b"
        );
    },
    init: () => {
        APP.mapping();
        APP.toggleMenu();
        APP.backToTop();
        APP.sourceInfo();
    }
}

function swiperInit() {
    const bannerHomeSlide = new Swiper(".home-banner .swiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 1000,
        observer: true,
        observeParents: true,
        modules: [EffectShutters],
        effect: 'shutters',
        shuttersEffect: {
            split: 5,
        },
        lazy: {
            loadPrevNext: true,
        },
        navigation: {
            nextEl: ".home-banner .button-next",
            prevEl: ".home-banner .button-prev",
        },
        pagination: {
            el: ".home-banner .swiper-pagination",
            clickable: true,
        },
    });

    // swiper utilities init
    if ($('.home-utilities').length) {
        var optionContent = {
            // loop: true,
            // autoplay: {
            // 	delay: 5000,
            // 	disableOnInteraction: false,
            // 	pauseOnMouseEnter: true,
            // },
            speed: 1000,
            spaceBetween: 15,
            observer: true,
            observeParents: true,

        };
        var optionImage = {
            // loop: true,
            // autoplay: {
            // 	delay: 5000,
            // 	disableOnInteraction: false,
            // 	pauseOnMouseEnter: true,
            // },
            speed: 1000,
            spaceBetween: 15,
            observer: true,
            observeParents: true,
            grabCursor: true,
            effect: "creative",
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: ["-20%", 0, -1],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
        };
        // utilities in
        var homeUtilInTab = new Swiper(".home-utilities .swiper-in", {
            ...optionContent,
            pagination: {
                el: ".home-utilities .swiper-pagination-in",
                clickable: true,
            },
            controller: {
                // by: 'container',
                // inverse: true,
                control: homeUtilInContent,
            },
        });
        var homeUtilInContent = new Swiper(".home-utilities .swiper-control-in", {
            ...optionImage,
            controller: {
                // by: 'container',
                // inverse: true,
                control: homeUtilInTab,
            },
        });
        // utilities out
        var homeUtilOutTab = new Swiper(".home-utilities .swiper-out", {
            ...optionContent,
            pagination: {
                el: ".home-utilities .swiper-pagination-out",
                clickable: true,
            },
            controller: {
                // by: 'container',
                // inverse: true,
                control: homeUtilOutContent,
            },
        });
        var homeUtilOutContent = new Swiper(".home-utilities .swiper-control-out", {
            ...optionImage,
            controller: {
                // by: 'container',
                // inverse: true,
                control: homeUtilOutTab,
            },
        });
        // control
        homeUtilInTab.controller.control = homeUtilInContent;
        homeUtilOutTab.controller.control = homeUtilOutContent;
    };

    // about
    const about2Slide = new Swiper(".about-2 .swiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 1000,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ["-120%", 0, -500],
            },
            next: {
                shadow: true,
                translate: ["120%", 0, -500],
            },
        },
        pagination: {
            el: ".about-2 .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".about-2 .button-next",
            prevEl: ".about-2 .button-prev",
        },
    });
    const about4Slide = new Swiper(".about-4 .swiper", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 1000,
        spaceBetween: 10,
        slidesPerView: 2,
        observer: true,
        observeParents: true,
        pagination: {
            el: ".about-4 .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".about-4 .button-next",
            prevEl: ".about-4 .button-prev",
        },
        breakpoints: {
            400: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });
    const aboutDealerSlide = new Swiper(".about-5 .main-dealer .swiper", {
        // loop: true,
        // autoplay: {
        // 	delay: 5000,
        // 	disableOnInteraction: false,
        // 	pauseOnMouseEnter: true,
        // },
        speed: 1000,
        slidesPerView: 2,
        spaceBetween: 10,
        // centeredSlides: true,
        observer: true,
        observeParents: true,
        pagination: {
            el: ".about-5 .main-dealer .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".about-5 .main-dealer .button-next",
            prevEl: ".about-5 .main-dealer .button-prev",
        },
        breakpoints: {
            400: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 25,
            },
            1280: {
                slidesPerView: 6,
                spaceBetween: 30,
            },
        },
    });
    const aboutFileSlide = new Swiper(".about-5 .main-file .swiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 1000,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        pagination: {
            el: ".about-5 .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".about-5 .button-next",
            prevEl: ".about-5 .button-prev",
        },
        breakpoints: {
            400: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });

    // news other - new detail
    const newsOtherSlide = new Swiper(".news-other .swiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 1000,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        pagination: {
            el: ".news-other .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".news-other .button-next",
            prevEl: ".news-other .button-prev",
        },
        breakpoints: {
            400: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });

    // gallery video
    const galleryVideoSlide = new Swiper(".gallery-video .swiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 1000,
        spaceBetween: 12,
        observer: true,
        observeParents: true,
        pagination: {
            el: ".gallery-video .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".gallery-video .button-next",
            prevEl: ".gallery-video .button-prev",
        },
    });
    // Master Plan
    $('.master-plan .swiper').each(function(index) {
        let newIndex = index + 1;
        $(this).addClass('swiper-' + newIndex);
        $(this).parents('.main-slide').find('.swiper-pagination').addClass('swiper-pagination-' + newIndex);
        $(this).parents('.main-slide').find('.button-next').addClass('button-next-' + newIndex);
        $(this).parents('.main-slide').find('.button-prev').addClass('button-prev-' + newIndex);
        const masterPlanSlide = new Swiper(".master-plan .swiper-" + newIndex, {
            // loop: true,
            // autoplay: {
            // 	delay: 3000,
            // 	disableOnInteraction: false,
            // 	pauseOnMouseEnter: true,
            // },
            speed: 1000,
            observer: true,
            observeParents: true,
            modules: [EffectShutters],
            effect: 'shutters',
            shuttersEffect: {
                split: 5,
            },
            pagination: {
                el: ".master-plan .swiper-pagination-" + newIndex,
                clickable: true,
            },
            navigation: {
                nextEl: ".master-plan .button-next-" + newIndex,
                prevEl: ".master-plan .button-prev-" + newIndex,
            },
        });
    })

}

function bindFancybox() {
    Fancybox.bind("[data-fancybox]", {
        showLoading: true,
        preload: true,
        infinite: false,
        // parentEl: document.forms[0], // Element containing main structure
        mainClass: "fancybox-wrapper", // Custom class name or multiple space-separated class names for the container
    });

    Fancybox.bind("a.popup-link", {
        showLoading: true,
        type: "iframe",
        preload: true,
    });

    Fancybox.bind('[data-fancybox="single"]', {
        groupAttr: false,
    });

    $(".btn-close-fancybox").on("click", function() {
        Fancybox.close();
    });

    Fancybox.defaults.Hash = true;
}

function accordionInit() {
    $('.accordion_item').on('click', function() {
        $(this)
            .toggleClass('active')
            .siblings().removeClass('active')
        $(this)
            .find('.accordion_header').toggleClass('active')
            .parents('.accordion_item')
            .siblings().find('.accordion_header').removeClass('active')
        $(this)
            .find('.accordion_content').slideToggle()
            .parents('.accordion_item')
            .siblings().find('.accordion_content').slideUp('active')
    });
}

function tabsletCustom() {
    var tabAll = $('.location-section .main-tabslet .tabslet-tabs a').length
    if (tabAll) {
        $('.location-section .main-tabslet').tabslet({
            active: tabAll,
            animation: true
        });
        var activeOffsetLeft = $('.location-section .main-tabslet .tabslet-tabs li.active').offset()
        $('.location-section .main-tabslet .tabslet-tabs').scrollLeft(activeOffsetLeft.left)
    }
    $('.main-tabslet').each(function() {
        var getIdActive = $(this).find('.tabslet-tabs li.active a').attr('href') + '-v2';
        $(this).find(`${getIdActive}`).fadeIn().siblings().hide();
        $(this).find('.tabslet-tabs li a').on('click', function() {
            var getNewIdActive = $(this).attr('href') + '-v2';
            $(this).parents('.main-tabslet').find(`${getNewIdActive}`).fadeIn().siblings().hide();
        });
    });

}

function minutesTabInit() {
    $('.location-section .main-tabslet .tabslet-tabs a').on('click', function() {
        var dataMinutes = $(this).data('minutes');
        if (dataMinutes == "all-minutes") {
            $(`.indicator-wrap .indicator`).addClass('opacity-100').removeClass('opacity-0');
            $(`.indicator-wrap .indicator path`).removeAttr('stroke-width');
        } else {
            $(`.indicator-wrap .indicator`).addClass('opacity-0').removeClass('opacity-100')
            $(`.indicator-wrap .indicator.${dataMinutes}`).addClass('opacity-100').removeClass('opacity-0');
            $(`.indicator-wrap .indicator.${dataMinutes} path`).attr('stroke-width', '6px');
        }
    });
}

function height(el) {
    var height = 0;
    $(el).each(function() {
        var thisHeight = $(this).height();
        if (thisHeight > height) {
            height = thisHeight;
        }
        setTimeout(() => {
            $(el).height(height)
        }, 100)
    })
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkMasterPlanCookie() {
    let mP = getCookie("masterPlan");
    $('.home-product .product-item a').on('click', function() {
        var dataMPC = $(this).data('master-plan');
        setCookie("masterPlan", dataMPC, 1);
    });
    if (mP != "") {
        $('.master-plan .main-tabslet').tabslet({
            active: Number(mP)
        });
        setTimeout(() => {
            $(`.site-plan .site-plan-tabs .plan-list li a[data-maphilight="maparea-${mP}"]`).trigger('click');
        }, 500);
    } else {
        $('.master-plan .main-tabslet').tabslet();
    }
}

function triggerMaterPlan() {
    $('map area').on('mousemove', function() {
        var dataType = $(this).data('src');
        return $(this).siblings(`area[data-src="${dataType}"]`).mouseover();
    })
}
if ($('.animate').length > 0 && $(window).width() > 1279) {
    const callback = (entries) => {
        entries.forEach(
            (entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = entry.target.dataset.animate;
                    // console.log(entry.target.style.animation);
                }
                // else {
                // 	entry.target.style.animation="none";
                // }
            }
        );
    }
    let observer = new IntersectionObserver(callback);
    const animationItems = document.querySelectorAll('.animate');
    animationItems.forEach(item => {
        observer.observe(item)
    });
}