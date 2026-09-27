
(function(){
  var overlay = document.getElementById('stageModal');
  if(!overlay) return;

  var modal = overlay.querySelector('.modal');
  var badgeEl = document.getElementById('modalBadge');
  var authorEl = document.getElementById('modalAuthor');
  var titleEl = document.getElementById('modalTitle');
  var ageEl = document.getElementById('modalAge');
  var bodyEl = document.getElementById('modalBody');
  var closeBtn = document.getElementById('modalClose');
  var lastFocused = null;

  function openModal(card){
    var tplId = card.getAttribute('data-modal');
    var tpl = document.getElementById(tplId);
    if(!tpl) return;

    lastFocused = card;

    badgeEl.src = card.getAttribute('data-badge') || '';
    badgeEl.alt = '';
    authorEl.textContent = card.getAttribute('data-author') || '';
    titleEl.textContent = tpl.getAttribute('data-title') || '';
    ageEl.textContent = tpl.getAttribute('data-age') || '';

    modal.style.setProperty('--accent', card.style.getPropertyValue('--accent'));

    bodyEl.innerHTML = '';
    bodyEl.appendChild(tpl.content.cloneNode(true));

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeBtn.focus();
  }

  function closeModal(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if(lastFocused){ lastFocused.focus(); }
  }

  document.querySelectorAll('.cell-card').forEach(function(card){
    card.addEventListener('click', function(){ openModal(card); });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function(e){
    if(e.target === overlay){ closeModal(); }
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && overlay.classList.contains('open')){ closeModal(); }
  });
})();
