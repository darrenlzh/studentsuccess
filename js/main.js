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

ready(function() {
  resizeBoxes();
});
