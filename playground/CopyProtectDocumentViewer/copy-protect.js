;(function(){
  // コピー防止オーバーレイを表示
  function showOverlay() {
    document.getElementById('overlay').classList.add('show');
  }

  // コピー防止オーバーレイを非表示
  function hideOverlay() {
    setTimeout(() => {
      document.getElementById('overlay').classList.remove('show');
    }, 300);
  }

  function keydown(e) {
    // PrintScreen押下時の処理
    if (e.code === 44) {
      showOverlay();
      hideOverlay();
    }

    // スクショを撮れそうな修飾キーを潰す
    switch (e.key) {
      case 'Control':
      case 'Shift':
      case 'Meta':
      case 'Alt':
        showOverlay();
        break;

      case 'Unidentified':
        hideOverlay();
    }
  }

  // 修飾キーを話したらオーバーレイ解除
  function keyup(e) {
    switch (e.key) {
      case 'Unidentified':
      case 'Control':
      case 'Shift':
      case 'Meta':
      case 'Alt':
        hideOverlay();
    }
  }

  window.addEventListener('keyup', keyup);
  window.addEventListener('keydown', keydown);
  window.addEventListener('blur', showOverlay);
  window.addEventListener('focus', hideOverlay);
  window.addEventListener('beforeprint', showOverlay);
})();
