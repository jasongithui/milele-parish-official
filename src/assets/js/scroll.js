(function () {
    var scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.03,
    });
    var seren = new LocomotiveScroll({
        el: document.querySelector('.serenity'),
    draggingClass: 'serenity',
    lerp: 0.04,
    });
  
    var jumbo = new LocomotiveScroll({
        el: document.querySelector('.jumbo-row'),
        lerp: 0.06,
    });
})();