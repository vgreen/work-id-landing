
window.onload = () => {

  //
  // sticky header
  //

  let stickyDiv = document.getElementById('sticky');
  let stickyValue = 0; // will stick on the top of the div
  stickyDiv.style.top = stickyValue + 'px';

  document.body.onscroll = () => {
    let distance = window.scrollY;
    if (distance <= (stickyValue + 10)) {
      stickyDiv.classList.remove('sticked')
    }
    else {
      stickyDiv.classList.add('sticked')
    }
  };

  const openMenu = () => {
    document.getElementsByClassName('mobile-menu-content')[0].classList.add('opened');
    document.getElementsByTagName('body')[0].classList.add('stop-scroll');
  };

  const closeMenu = () => {
    console.log(1)
    document.getElementsByClassName('mobile-menu-content')[0].classList.remove('opened');
    document.getElementsByTagName('body')[0].classList.remove('stop-scroll');
  };

  document.getElementsByClassName('open')[0].onclick = openMenu;
  document.getElementsByClassName('close')[0].onclick = closeMenu;

  const links = document.getElementsByClassName('mobile-menu-item');
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = closeMenu;
  }

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
            showMessage('<p class="green-text">Запрос успешно отправлен</p>');
          }
        });
    }
  };
};
