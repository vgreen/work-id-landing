
window.onload = () => {

  //
  // sticky header
  //

  let stickyDiv = document.getElementById('sticky');
  let stickyValue = 0; // will stick on the top of the div
  stickyDiv.style.top = stickyValue + 'px';

  if (window.scrollY <= (stickyValue + 10)) {
    stickyDiv.classList.remove('sticked')
  }
  else {
    stickyDiv.classList.add('sticked')
  }

  document.body.onscroll = () => {
    let distance = window.scrollY;
    if (distance <= (stickyValue + 10)) {
      stickyDiv.classList.remove('sticked')
    }
    else {
      stickyDiv.classList.add('sticked')
    }
  };

  const emailRegex = /\S+@\S+\.\w+/;

  const openMenu = () => {
    document.getElementsByClassName('mobile-menu-content')[0].classList.add('opened');
    document.getElementsByTagName('body')[0].classList.add('stop-scroll');
  };

  const closeMenu = () => {
    console.log(1)
    document.getElementsByClassName('mobile-menu-content')[0].classList.remove('opened');
    document.getElementsByTagName('body')[0].classList.remove('stop-scroll');
  };


  const closeModal = () => {
    document.getElementById('modal').classList.remove('isShown');
    document.getElementById('shadow').classList.remove('isShown');
    document.body.classList.remove('stop-scroll');
  };


  const showModal = (isOk) => {
    document.getElementById('modal-result').innerHTML =
      isOk
        ? '<h2>Отлично!</h2><p>В течение ближайшего времени мы свяжемся с Вами</p>'
        : '<h2>Что-то пошло не так...</h2><p>Проблемы с соединением, попробуйте позже</p>';
    document.getElementById('modal').classList.add('isShown');
    document.getElementById('shadow').classList.add('isShown');
    // document.body.classList.add('stop-scroll');
  };


  document.getElementsByClassName('open')[0].onclick = openMenu;
  document.getElementsByClassName('close')[0].onclick = closeMenu;
  document.getElementById('modal-button').onclick = closeModal;

  const links = document.getElementsByClassName('mobile-menu-item');
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = closeMenu;
  }

  const validEmail = (email) => {
    return emailRegex.test(email);
  };

  const showMessage = (msg) => {
    document.getElementById('result').innerHTML = msg;
  };

  document.getElementById('submit-form').onclick = () => {
    const data = {
      'phone': document.getElementById('phone').value,
      'fio': document.getElementById('fio').value,
      'email': document.getElementById('email').value,
    };
    if (!(data.email && data.phone && data.fio)) showMessage('<p class="red-text">Заполните все поля</p>');
    else {
      if(!validEmail(data.email)){
        showMessage('<p class="red-text">Введите корректный email</p>');
      }
      else if(!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(data.phone)){
        showMessage('<p class="red-text">Введите корректный телефон</p>');
      }
      else{
        let request_options= {
          headers:{
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          method: "POST",
          body: JSON.stringify(data)
        };
        fetch('https://idwork.enface.ai/idwork', request_options)
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if(res && res.ok){
              showMessage('');
              showModal(true);
              document.getElementById('phone').value = '';
              document.getElementById('email').value = '';
              document.getElementById('fio').value = '';
            }
          })
          .catch(() => {
            showModal(false);
          })
      }
    }
  };
};
