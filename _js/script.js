
(function(){
  var btn = document.getElementById('themeBtn');
  var root = document.documentElement;
  function apply(theme){
    if(theme === 'dark'){ root.setAttribute('data-theme','dark'); btn.textContent = '☀️ Tema claro'; }
    else { root.setAttribute('data-theme','light'); btn.textContent = '🌙 Tema escuro'; }
  }
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch(e){}
  if(!saved){
    saved = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  apply(saved);
  btn.addEventListener('click', function(){
    var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch(e){}
  });
})();

// Abre a aba do autor indicada no endereço (ex.: index.html#t-erikson)
(function(){
  function openFromHash(){
    var id = (location.hash || '').slice(1);
    if(!/^t-/.test(id)) return;
    var radio = document.getElementById(id);
    if(radio && radio.type === 'radio'){ radio.checked = true; window.scrollTo(0, 0); }
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
