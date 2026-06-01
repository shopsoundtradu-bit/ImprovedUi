function toggleSeedLock() {
    const toggle = document.getElementById('seedLockToggle');
    const seedRow = document.getElementById('seedRow');
    toggle.classList.toggle('on');
    
    if (toggle.classList.contains('on')) {
      seedRow.classList.add('disabled');
    } else {
      seedRow.classList.remove('disabled');
    }
  }

// ── Appearance (theme) switcher ─────────────────────────────────────────────
// Cycles System → Light → Dark using the shared window.AppTheme controller
// loaded from assets/theme.js. Updates the row-value label to reflect state.
(function initAppearanceSwitcher() {
  function labelFor(mode) {
    if (mode === 'light') return 'Light';
    if (mode === 'dark') return 'Dark';
    return 'System';
  }
  function sync() {
    var el = document.getElementById('appearanceValue');
    if (el && window.AppTheme) el.textContent = labelFor(window.AppTheme.get());
  }
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    sync();
    var row = document.getElementById('appearanceRow');
    if (row && window.AppTheme) {
      row.addEventListener('click', function () {
        window.AppTheme.cycle();
        sync();
      });
    }
    window.addEventListener('app-theme-change', sync);
  });
})();
