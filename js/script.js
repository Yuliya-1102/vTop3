var swiper = new Swiper(".process__swiper", {
    autoplay: {
        delay: 4000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        
    },
    loop: true,
    autoHeight: false,
});

// animation
initImg('#test img', [
    'img/team-2.png',
    'img/team-1.png' 
  ]); 
  
  function initImg(selector, srcArr) {
    const img = document.querySelector(selector); 
    Object.assign(img, {
      buf: Object.assign(new Image(), { img }), 
      srcArr: [...srcArr], 
      changeInterval: 5e3,
      bufIdx: 0,
      change: function () {
        this.style.animationName = 'img-in'; 
        this.src = this.buf.src || this.nextImage(); 
        this.buf.src = this.nextImage(); 
      }, 
      nextImage: function () {
        this.bufIdx = ++this.bufIdx < this.srcArr.length ? this.bufIdx : 0;
        return this.srcArr[this.bufIdx];
      }
    }); 
    img.buf.addEventListener('load', loadHandler); 
    img.addEventListener('animationend', animEndHandler); 
    img.change(); 
    return img; 
  
    function loadHandler() {
      setTimeout(
        () => this.img.style.animationName = 'img-out', 
        this.img.changeInterval 
      ); 
    }
    function animEndHandler({ animationName }) {
      if (animationName === 'img-out') 
        this.change(); 
    }
  }

  // menu
  const dlClose = document.querySelectorAll('.dl-close');
  const menuwrapper = document.querySelector('.dl-menu');
  const dlMenuwrapperBtn = document.querySelector('.dl-menuwrapper__btn');
  

  dlClose.forEach((item) => {
    item.addEventListener('click', () => {
      menuwrapper.classList.remove('dl-menuopen');
      dlMenuwrapperBtn.classList.remove('dl-active');
      menuwrapper.classList.add('dl-menu-toggle');
    })
  })

// change language
const headerLangItem = document.querySelectorAll('.header__lang-item');
const langNameMain = document.querySelector('.header__lang-name--main');
const langImgMain = document.querySelector('.header__lang-img--main img');

headerLangItem.forEach(item => {
  item.addEventListener('click', (event) => {
    let target = event.target;
    langNameMain.textContent = target.parentNode.textContent;
    langImgMain.setAttribute('src', target.parentNode.lastElementChild.attributes.src.nodeValue);
  })
})



//mask
let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+375 (99) 999-99-99');
im.mask(selector);

// validation
let validateForms = function(selector, rules, yaGoal) {
	new window.JustValidate(selector, {
		rules: rules,
		submitHandler: function(form) {
			let formData = new FormData(form);

			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('Отправлено');
					}
				}
			}

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			form.reset();

		}
	});
}
validateForms('.form', { tel: {required: true}, name: {required: true}, checkbox: { required: true}}, 'send goal');

validateForms('.form-1', { tel: {required: true}, name: {required: true}, checkbox: { required: true}}, 'send goal');


