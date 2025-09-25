(function(){
  function handleCopy(button) {
    const pre = button.closest('.codeblock');
    if (!pre) return;
    const code = pre.querySelector('p');
    if (!code) return;
    const text = code.innerText;
    navigator.clipboard.writeText(text).then(() => {
      button.classList.add('copied');
      setTimeout(() => button.classList.remove('copied'), 1500);
    });
  }

  document.addEventListener('click', function(e){
    const target = e.target;
    if (target && target.classList.contains('copy-btn')) {
      handleCopy(target);
    }
  });
})();


