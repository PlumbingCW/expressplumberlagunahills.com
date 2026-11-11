(function () {
  var BP = 900;
  var root = document.documentElement;
  var toggle = document.getElementById('mob-toggle');
  var drawer = document.getElementById('mob-drawer');
  function setMenu(open) {
    if (!toggle || !drawer) return;
    drawer.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    root.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setMenu(false);
      document.querySelectorAll('.has-drop.open').forEach(function (d) {
        d.classList.remove('open');
        var b = d.querySelector('.nav-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > BP) setMenu(false);
  });
  document.querySelectorAll('.has-drop > .nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var li = btn.parentElement;
      var open = !li.classList.contains('open');
      document.querySelectorAll('.has-drop.open').forEach(function (d) {
        d.classList.remove('open');
        var b = d.querySelector('.nav-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (open) li.classList.add('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-drop')) {
      document.querySelectorAll('.has-drop.open').forEach(function (d) {
        d.classList.remove('open');
        var b = d.querySelector('.nav-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });
  var fab = document.getElementById('fab-call');
  var hero = document.querySelector('.hero, .pagehead');
  if (fab && hero && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { fab.classList.toggle('hide', en.isIntersecting); });
    });
    io.observe(hero);
    fab.classList.add('hide');
  }
})();
