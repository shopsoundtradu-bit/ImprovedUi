// --- ELEMENTS ---
  const chatInput = document.getElementById('chatInput');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const filterDrawer = document.getElementById('filterDrawer');
  const modelSwitcher = document.querySelector('.model-switcher');
  const modelMenu = document.getElementById('modelMenu');
  
  
(function () {
  const textarea = document.getElementById('chatInput');
  const textareaWrapper = document.getElementById('textareaWrapper');
  const inputBox = document.getElementById('inputBox');

  const LINE_HEIGHT = 24;
  const MAX_LINES = 9;
  let isExpanded = false;

  function autoResize() {
    if (!textarea || isExpanded) return;
    textarea.style.transition = 'none';
    textarea.style.height = 'auto';
    const maxHeight = LINE_HEIGHT * MAX_LINES;
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + 'px';
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  function getExpandedTextareaHeight() {
    const vv = window.visualViewport;
    const viewportHeight = vv ? vv.height : window.innerHeight;
    const header = document.getElementById('mainHeader');
    const headerH = header ? header.getBoundingClientRect().height : 64;
    const toolbarEl = inputBox ? inputBox.querySelector('.input-toolbar') : null;
    const toolbarH = toolbarEl ? toolbarEl.getBoundingClientRect().height : 50;
    const paddingAndGap = 14 + 14 + 14; // top + gap + bottom padding of input-box
    return Math.max(60, viewportHeight - headerH - toolbarH - paddingAndGap);
  }

  window.expandTextarea = function () {
    if (!textarea || !inputBox) return;
    isExpanded = true;
    inputBox.classList.add('is-expanded');
    textarea.style.transition = 'height 0.2s ease';
    textarea.style.height = getExpandedTextareaHeight() + 'px';
    textarea.style.overflowY = 'auto';
  };

  window.shrinkTextarea = function () {
    if (!textarea || !inputBox) return;
    isExpanded = false;
    inputBox.classList.remove('is-expanded');
    textarea.style.transition = 'height 0.2s ease';
    textarea.style.height = 'auto';
    // Let transition finish then snap to auto-resize
    setTimeout(autoResize, 200);
  };

  if (textarea) {
    textarea.addEventListener('input', function () {
      const hasText = textarea.value.length > 0;
      if (textareaWrapper) textareaWrapper.classList.toggle('has-text', hasText);
      if (!hasText && isExpanded) shrinkTextarea();
      autoResize();
    });
    autoResize();
  }

  // Smooth keyboard open/close response
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', function () {
      if (isExpanded) {
        textarea.style.transition = 'height 0.2s ease';
        textarea.style.height = getExpandedTextareaHeight() + 'px';
      }
    });
  }
})();


  

  function toggleModelMenu() {
    const isOpen = modelMenu.classList.toggle('open');
}

modelSwitcher.onclick = (e) => {
  e.stopPropagation();
  toggleModelMenu();
};

// Update your existing document click listener to close the menu too
document.addEventListener('click', (e) => {
  if (modelMenu.classList.contains('open') && !modelMenu.contains(e.target)) {
    toggleModelMenu();
  }
  // ... (keep your existing sidebar logic here)
});


  // --- SIDEBAR & OVERLAY LOGIC ---
  function toggleSidebar() {
    const isOpen = sidebar.classList.toggle('open');
    if (overlay) {
      overlay.classList.toggle('active', isOpen);
    }
  }

  // --- FILTERS LOGIC ---
  function toggleFilters() {
    filterDrawer.classList.toggle('open');
  }

  // --- INPUT LOGIC ---

  // --- GLOBAL CLICK MANAGER ---
  // This handles closing the sidebar when clicking the overlay or outside
  document.addEventListener('click', (e) => {
    const headerLeft = document.querySelector('.header-left');
    
    if (sidebar.classList.contains('open')) {
      // If clicking the overlay OR clicking outside the sidebar/menu-button
      if (e.target === overlay || (!sidebar.contains(e.target) && !headerLeft.contains(e.target))) {
        toggleSidebar();
      }
    }
  });

  // --- SHEET MANAGEMENT ---
  function openSheet(sheetId) {
    // Close sidebar and overlay when opening a full sheet
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.getElementById(sheetId).classList.add('open');
  }

  function closeSheet(sheetId) {
    document.getElementById(sheetId).classList.remove('open');
  }

  // --- EVENT LISTENERS ---
  document.getElementById('libraryBtn').onclick = () => openSheet('librarySheet');
  document.getElementById('closeSheet').onclick = () => closeSheet('librarySheet');

  document.getElementById('designerBtn').onclick = () => openSheet('designerSheet');
  document.getElementById('closeDesignerSheet').onclick = () => closeSheet('designerSheet');

  // Shared: bind whichever 'new' button exists on this page (page-6 has newProjectBtn, page-7 has newPartBtn, page-8 has neither)
  var _newBtn = document.getElementById('newProjectBtn') || document.getElementById('newPartBtn');
  if (_newBtn) _newBtn.onclick = () => openSheet('newProjectsSheet');
  var _closeNewProjects = document.getElementById('closenewProjectsSheet'); if (_closeNewProjects) _closeNewProjects.onclick = () => closeSheet('newProjectsSheet');

  document.getElementById('newDesignBtn').onclick = () => openSheet('newDesignSheet');
  document.getElementById('closeNewDesignSheet').onclick = () => closeSheet('newDesignSheet');
