
window.onload = () => {
  document.getElementsByClassName('open')[0].onclick = () => {
    document.getElementsByClassName('mobile-menu-content')[0].classList.add('opened');
    document.getElementsByTagName('body')[0].classList.add('stop-scroll');
  };
  document.getElementsByClassName('close')[0].onclick = () => {
    document.getElementsByClassName('mobile-menu-content')[0].classList.remove('opened');
    document.getElementsByTagName('body')[0].classList.remove('stop-scroll');
  }

  document.getElementById('submit-form').onclick = () => {
    const data = {
      'phone': document.getElementById('phone').value,
      'fio': document.getElementById('fio').value,
      'email': document.getElementById('email').value,
    };
    console.log(data);
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
          document.getElementById('result').innerHTML = 'Запрос успешно отправлен'
        }
      });
  };
};
