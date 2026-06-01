/* Unified theme controller. Reads/writes localStorage('app-theme') with
   values: 'system' | 'light' | 'dark'. Defaults to 'system'. */
(function () {
  var KEY = 'app-theme';
  function getStored() {
    try { return localStorage.getItem(KEY) || 'system'; } catch (e) { return 'system'; }
  }
  function apply(mode) {
    var root = document.documentElement;
    if (mode === 'light' || mode === 'dark') {
      root.setAttribute('data-theme', mode);
    } else {
      root.removeAttribute('data-theme');
    }
  }
  function set(mode) {
    if (mode !== 'system' && mode !== 'light' && mode !== 'dark') mode = 'system';
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    apply(mode);
    window.dispatchEvent(new CustomEvent('app-theme-change', { detail: { mode: mode } }));
  }
  function cycle() {
    var order = ['system', 'light', 'dark'];
    var next = order[(order.indexOf(getStored()) + 1) % order.length];
    set(next);
    return next;
  }
  // Apply immediately to avoid FOUC
  apply(getStored());
  // Listen for system theme changes while in 'system' mode
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var listener = function () { if (getStored() === 'system') apply('system'); };
    if (mq.addEventListener) mq.addEventListener('change', listener);
    else if (mq.addListener) mq.addListener(listener);
  }
  window.AppTheme = { get: getStored, set: set, cycle: cycle };
})();
