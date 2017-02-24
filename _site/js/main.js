ready(function() {
  resizeBoxes();
  appearEffects();
  clickControl();
  window.addEventListener('resize', function() {
    resizeBoxes();
  });
  window.addEventListener('scroll', function() {
    headerParallax();
    scrollControl();
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
  var variable = document.getElementById('dynamic-height-for-grid'),
      variable2 = document.getElementById('dynamic-width-for-expand'),
      viewWidth = variable.offsetWidth,
      boxWidth = variable2.offsetWidth,
      width = window.innerWidth,
      views = document.querySelectorAll('div.view'),
      viewExpands = document.querySelectorAll('div.view-expand');
  Array.prototype.forEach.call(views, function(view, i) {
    view.style.height = viewWidth;
  });

  var refWidth = document.getElementById('ssbr').offsetWidth,
      students = document.querySelectorAll('div.student');
  Array.prototype.forEach.call(students, function(student, i) {
    var studentView = student.querySelector('div.student__heading div.view');
    studentView.style.height = refWidth;
  });
  var hereButton = document.getElementById('here-button'),
      svg = hereButton.querySelector('svg'),
      shape = hereButton.querySelector('svg rect.shape');
  if (width < 375) {
    svg.setAttribute('width', '190px');
    shape.setAttribute('width', '190px');
  } else if (width >= 375 && width < 768) {
    svg.setAttribute('width', '220px');
    shape.setAttribute('width', '220px');
  } else {
    svg.setAttribute('width', '320px');
    shape.setAttribute('width', '320px');
  }
}

function appearEffects() {
  var fades = document.querySelectorAll('div.fade-elem');
  Array.prototype.forEach.call(fades, function(fade, i) {
    setTimeout(function(i) {
      fade.classList.add('fade-in');
    }, 150 * (i+1));
  });
  var arrow = document.getElementById('arrow');
  setTimeout(function() {
    arrow.classList.add('fade-down');
  }, 1000);
  var main = document.getElementById('main');
  arrow.addEventListener('click', function() {
    bringIntoView(main, 500);
  });
}

function changeTab(elem, tabName) {
  var i, j,
      navList = document.querySelectorAll('#about div.sidebar ul li'),
      contentInner = document.getElementsByClassName('content__inner');
  for (i=0; i<contentInner.length; i++) {
    contentInner[i].style.display = 'none';
  }
  document.getElementById(tabName).style.display = 'block';
  for (j=0; j<navList.length; j++) {
    navList[j].classList.remove('active');
  }
  elem.parentNode.classList.add('active');
}

function clickControl() {
  var views = document.querySelectorAll('div.box div.view');
  Array.prototype.forEach.call(views, function(view, i) {
    view.addEventListener('click', function() {
      var notThese = document.querySelectorAll('div.is-expanded');
      if (this.parentNode.classList.contains('is-collapsed')) {
        Array.prototype.forEach.call(notThese, function(notThis, i) {
          notThis.classList.remove('is-expanded');
          notThis.classList.add('is-collapsed');
        });
        this.parentNode.classList.remove('is-collapsed');
        this.parentNode.classList.add('is-expanded');
        var that = this;
        setTimeout(function() {
          bringIntoView(that, 500);
        }, 250);
      } else {
        this.parentNode.classList.remove('is-expanded');
        this.parentNode.classList.add('is-collapsed');
      }
    });
  });

  var studentPhotoViews = document.querySelectorAll('div.student div.view--sp');
  Array.prototype.forEach.call(studentPhotoViews, function(view, i) {
    view.addEventListener('click', function() {
      var notThese = document.querySelectorAll('div.is-expanded'),
          studentHeading = this.parentNode.parentNode.querySelector('div.student__heading');
      if (studentHeading.classList.contains('is-collapsed')) {
        Array.prototype.forEach.call(notThese, function(notThis, i) {
          notThis.classList.remove('is-expanded');
          notThis.classList.add('is-collapsed');
        });
        studentHeading.classList.remove('is-collapsed');
        studentHeading.classList.add('is-expanded');
        var that = this;
        setTimeout(function() {
          bringIntoView(that, 500);
        }, 250);
      } else {
        studentHeading.classList.remove('is-expanded');
        studentHeading.classList.add('is-collapsed');
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
  var staffs = document.querySelectorAll('#about div.staff div.staff-header');
  Array.prototype.forEach.call(staffs, function(staff, i) {
    staff.addEventListener('click', function() {
      if (this.parentNode.classList.contains('is-collapsed')) {
        var notThese = document.querySelectorAll('div.staff.is-expanded');
        Array.prototype.forEach.call(notThese, function(notThis, i) {
          notThis.classList.remove('is-expanded');
          notThis.classList.add('is-collapsed');
        });
        this.parentNode.classList.remove('is-collapsed');
        this.parentNode.classList.add('is-expanded');
        var that = this;
      } else {
        this.parentNode.classList.remove('is-expanded');
        this.parentNode.classList.add('is-collapsed');
      }
    });
  });

  var hereButton = document.getElementById('here-button'),
      studentProfile = document.querySelector('#student-profile-1 div.student__heading');
  hereButton.addEventListener('click', function() {
    if (studentProfile.classList.contains('is-collapsed')) {
      studentProfile.classList.remove('is-collapsed');
      studentProfile.classList.add('is-expanded');
    }
    bringIntoView(studentProfile, 500);
  });
}

function headerParallax() {
  var hero = document.getElementById('hero'),
      width = window.innerWidth,
      scrollTop = document.body.scrollTop;
  if (scrollTop > 0 && width > 767) {
    hero.style.backgroundPosition = 'center ' + -scrollTop/2 + 'px';
  } else {
    hero.style.backgroundPosition = 'center 0';
  }
}

function scrollControl() {
  var scrollTop = document.body.scrollTop,
      arrow = document.getElementById('arrow'),
      mainTop = document.getElementById('main').offsetTop,
      navTop = document.getElementById('navigation').offsetTop,
      shTop = document.getElementById('section-heading').offsetTop,
      sp1Top = document.getElementById('student-profile-1').offsetTop,
      sp2Top = document.getElementById('student-profile-2').offsetTop,
      sp3Top = document.getElementById('student-profile-3').offsetTop,
      seTop = document.getElementById('section-ending').offsetTop,
      windowHeight = window.innerHeight,
      navBoxes = document.querySelectorAll('div#navigation div.box'),
      shBoxes = document.querySelectorAll('div#section-heading div.box'),
      sp1Boxes = document.querySelectorAll('div#student-profile-1 div.box'),
      sp2Boxes = document.querySelectorAll('div#student-profile-2 div.box'),
      sp3Boxes = document.querySelectorAll('div#student-profile-3 div.box'),
      seBoxes = document.querySelectorAll('div#section-ending div.box');

  if( scrollTop > (mainTop*0.4) ) {
    arrow.classList.add('hide-elem');
    arrow.classList.remove('show-elem');
  } else {
    arrow.classList.add('show-elem');
    arrow.classList.remove('hide-elem');
  }
  if ( (navTop-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(navBoxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter');
      }, 150 * (i+1));
    });
  }
  if ( (shTop-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(shBoxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter');
      }, 150 * (i+1));
    });
  }
  if ( (sp1Top-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(sp1Boxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter');
      }, 150 * (i+1));
    });
  }
  if ( (sp2Top-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(sp2Boxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter');
      }, 150 * (i+1));
    });
  }
  if ( (sp3Top-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(sp3Boxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter');
      }, 150 * (i+1));
    });
  }
  if ( (seTop-scrollTop) < windowHeight) {
    Array.prototype.forEach.call(seBoxes, function(box, i) {
      setTimeout(function(i) {
        box.classList.add('enter');
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
