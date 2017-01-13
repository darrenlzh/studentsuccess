ready(function() {
  resizeBoxes();
  manageBoxes();
  window.addEventListener('resize', function() {
    resizeBoxes();
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
  var views = document.querySelectorAll('div.view');
  Array.prototype.forEach.call(views, function(view, i) {
    var viewWidth = view.offsetWidth;
    view.style.height = viewWidth;
  });
}

// function headerParallax() {
//   var
// }

function manageBoxes() {
  var views = document.querySelectorAll('div.box div.view');
  Array.prototype.forEach.call(views, function(view, i) {
    view.addEventListener('click', function() {
      if (this.parentNode.classList.contains('is-collapsed')) {
        bringIntoView(document.getElementById('nav-anchor'), 1000);
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
