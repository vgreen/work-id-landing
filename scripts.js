
window.onload = () => {
  document.getElementsByClassName('open')[0].onclick = () => {
    document.getElementsByClassName('mobile-menu-content')[0].classList.add('opened');
    document.getElementsByTagName('body')[0].classList.add('stop-scroll');
  };
  document.getElementsByClassName('close')[0].onclick = () => {
    document.getElementsByClassName('mobile-menu-content')[0].classList.remove('opened');
    document.getElementsByTagName('body')[0].classList.remove('stop-scroll');
  }
};
