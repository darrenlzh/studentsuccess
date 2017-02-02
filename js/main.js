ready(function() {
  resizeBoxes();
  fadeIn();
  manageBoxes();
  window.addEventListener('resize', function() {
    resizeBoxes();
  });
  window.addEventListener('scroll', function() {
    headerParallax();
    enterRotate();
  });
});

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function resizeBoxes() {
  var variable = document.getElementById('dynamic-height-for-grid');
  var variable2 = document.getElementById('dynamic-width-for-expand');
  var viewWidth = variable.offsetWidth;
  var boxWidth = variable2.offsetWidth;
  var views = document.querySelectorAll('div.view');
  var viewExpands = document.querySelectorAll('div.view-expand');
  Array.prototype.forEach.call(views, function(view, i) {
    view.style.height = viewWidth;
  });
  // Array.prototype.forEach.call(viewExpands, function(viewExpand, i) {
  //   viewExpand.style.width = ((boxWidth * 4) - 4);
  //   // Adjusting .view-expand width
  // });
  // console.log(boxWidth);
}

function fadeIn() {
  var fades = document.querySelectorAll('div.fade-elem');
  Array.prototype.forEach.call(fades, function(fade, i) {
    setTimeout(function(i) {
      fade.classList.add('fade-in');
    }, 150 * (i+1));
  });
}

function manageBoxes() {
  var views = document.querySelectorAll('div.box div.view');
  Array.prototype.forEach.call(views, function(view, i) {
    view.addEventListener('click', function() {
      if (this.parentNode.classList.contains('is-collapsed')) {
        if (this.parentNode.parentNode.parentNode.parentNode.id === 'navigation') {
          bringIntoView(document.getElementById('nav-anchor'), 1000);
        }
        var notThese = document.querySelectorAll('div.is-expanded');
        Array.prototype.forEach.call(notThese, function(notThis, i) {
          notThis.classList.remove('is-expanded');
          notThis.classList.add('is-collapsed');
        });
        this.parentNode.classList.remove('is-collapsed');
        this.parentNode.classList.add('is-expanded');
      } else {
        this.parentNode.classList.remove('is-expanded');
        this.parentNode.classList.add('is-collapsed');
      }
    });
  });
  var closes = document.querySelectorAll('div.box div.view-expand div.close');
  Array.prototype.forEach.call(closes, function(close, i) {
    close.addEventListener('click', function() {
      this.parentNode.parentNode.classList.remove('is-expanded');
      this.parentNode.parentNode.classList.add('is-collapsed');
    });
  });
}

function headerParallax() {
  var hero = document.getElementById('hero');
  var scrollTop = document.body.scrollTop;
  if (scrollTop > 0) {
    hero.style.backgroundPosition = 'center ' + -scrollTop/2 + 'px';
  } else {
    hero.style.backgroundPosition = 'center 0';
  }
}

function enterRotate() {
  var scrollTop = document.body.scrollTop;
  var navTop = document.getElementById('navigation').offsetTop;
  var sp1Top = document.getElementById('student-profile-1').offsetTop;
  var sp2Top = document.getElementById('student-profile-2').offsetTop;
  var sp3Top = document.getElementById('student-profile-3').offsetTop;
  var windowHeight = window.innerHeight;
  var navBoxes = document.querySelectorAll('div#navigation div.box');
  var sp1Boxes = document.querySelectorAll('div#student-profile-1 div.box');
  var sp2Boxes = document.querySelectorAll('div#student-profile-2 div.box');
  var sp3Boxes = document.querySelectorAll('div#student-profile-3 div.box');
  if ( (navTop-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(navBoxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter-rotate');
      }, 150 * (i+1));
    });
  }
  if ( (sp1Top-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(sp1Boxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter-rotate');
      }, 150 * (i+1));
    });
  }
  if ( (sp2Top-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(sp2Boxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter-rotate');
      }, 150 * (i+1));
    });
  }
  if ( (sp3Top-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(sp3Boxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter-rotate');
      }, 150 * (i+1));
    });
  }
}

window.bringIntoView_started = 0;
window.bringIntoView_ends = 0;
window.bringIntoView_y = 0;
window.bringIntoView_tick = function() {
  var distanceLeft, dt, duration, t, travel;
  t = Date.now();
  if (t < window.bringIntoView_ends) {
    dt = t - window.bringIntoView_started;
    duration = window.bringIntoView_ends - window.bringIntoView_started;
    distanceLeft = window.bringIntoView_y - document.body.scrollTop;
      travel = distanceLeft * (dt / duration);
      document.body.scrollTop += travel;
      window.requestAnimationFrame(window.bringIntoView_tick);
  } else {
    document.body.scrollTop = window.bringIntoView_y;
  }
};
window.bringIntoView = function(e, duration) {
  window.bringIntoView_started = Date.now();
  window.bringIntoView_ends = window.bringIntoView_started + duration;
  window.bringIntoView_y = Math.min(document.body.scrollTop + e.getBoundingClientRect().top, document.body.scrollHeight - window.innerHeight);
  window.requestAnimationFrame(window.bringIntoView_tick);
};
