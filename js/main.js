'use strict';

var buttonOpenPopup = document.querySelector('.btn--call');
var btnScrollDown = document.querySelector('.promo__scroll-button');
var btnPromoConsultation = document.querySelector('.promo__button');
var pageOverlay = document.querySelector('.overlay');

var modal = document.querySelector('.modal-js');
if (modal) {
  var buttonClosePopup = modal.querySelector('.modal__button-close');
  var modalForm = modal.querySelector('.modal__form');
  var nameUser = modal.querySelector('[name=username]');
  var phoneUser = modal.querySelector('[name=userphone]');
  var questionUser = modal.querySelector('[name=userquestion]');
  var modalInputPhone = modal.querySelector('#modaluser-phone');
}

var footer = document.querySelector('.footer');
if (footer) {
  var footerNav = footer.querySelector('.footer__navigation');
  var footerContact = footer.querySelector('.footer__contact');
  var footerToggleNav = footer.querySelector('.footer__toggle--navigation');
  var footerToggleContact = footer.querySelector('.footer__toggle--contact');
}

var sectionContact = document.querySelector('#contact');
if (sectionContact) {
  var formInputPhone = sectionContact.querySelector('#user-phone');
}

var isStorageSupport = true;
var storage = '';
var storagePhone = '';
var storageText = '';
var ESC_KEYCODE = 27;

if (footerToggleNav) {
  footerToggleNav.addEventListener('click', function () {
    if (footerNav.classList.contains('footer__navigation--closed') || footerContact.classList.contains('footer__contact--opened')) {
      footerNav.classList.remove('footer__navigation--closed');
      footerNav.classList.add('footer__navigation--opened');
      footerContact.classList.remove('footer__contact--opened');
      footerContact.classList.add('footer__contact--closed');
    } else {
      footerNav.classList.add('footer__navigation--closed');
      footerNav.classList.remove('footer__navigation--opened');
    }
  });
}

if (footerToggleContact) {
  footerToggleContact.addEventListener('click', function () {
    if (footerContact.classList.contains('footer__contact--closed') || footerNav.classList.contains('footer__contact--opened')) {
      footerContact.classList.remove('footer__contact--closed');
      footerContact.classList.add('footer__contact--opened');
      footerNav.classList.remove('footer__navigation--opened');
      footerNav.classList.add('footer__navigation--closed');
    } else {
      footerContact.classList.add('footer__contact--closed');
      footerContact.classList.remove('footer__contact--opened');
    }
  });
}

// сохраняем значения полей в localStorage

try {
  storage = localStorage.getItem('nameUser');
  storagePhone = localStorage.getItem('phoneUser');
  storageText = localStorage.getItem('questionUser');
} catch (err) {
  isStorageSupport = false;
}

// утилита для обработки клавиатурных событий

var isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    action();
  }
};

// обработчик нажатия ESC

var onPopupEscPress = function (evt) {
  isEscEvent(evt, closePopup);
};

// обработчик нажатия на overlay

var onCLickOverlay = function () {
  if (modal.classList.contains('modal__open') && pageOverlay.classList.contains('overlay__open')) {
    modal.classList.remove('modal__open');
    modal.classList.remove('modal__error');
    pageOverlay.classList.remove('overlay__open');
  }
};

// логика открытия popup

if (modal) {
  var openPopup = function (evt) {
    evt.preventDefault();

    if (storage) {
      nameUser.value = storage;
      phoneUser.value = storagePhone;
      questionUser.value = storageText;
      questionUser.focus();
    } else {
      nameUser.focus();
    }

    modal.classList.add('modal__open');
    pageOverlay.classList.add('overlay__open');

    pageOverlay.addEventListener('click', onCLickOverlay);
    document.addEventListener('keydown', onPopupEscPress);
  };
}

// логика закрытия popup

var closePopup = function () {

  if (modal.classList.contains('modal__open') && pageOverlay.classList.contains('overlay__open')) {
    modal.classList.remove('modal__open');
    modal.classList.remove('modal__error');
    pageOverlay.classList.remove('overlay__open');
  }

  pageOverlay.removeEventListener('click', onCLickOverlay);
  document.removeEventListener('keydown', onPopupEscPress);
};

// логика ошибки при вводе данных

var errorPopup = function () {
  modal.classList.add('modal__error');
};

// логика валидации формы popup

var formValidation = function (evt) {
  if (!nameUser.value || !phoneUser.value || !questionUser.value) {
    evt.preventDefault();
    errorPopup();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('nameUser', nameUser.value.trim());
      localStorage.setItem('phoneUser', phoneUser.value.trim());
    }
  }
};

// навешиваем события на элементы

if (buttonOpenPopup) {
  buttonOpenPopup.addEventListener('click', openPopup);
}
if (buttonClosePopup) {
  buttonClosePopup.addEventListener('click', closePopup);
}

if (modalForm) {
  modalForm.addEventListener('submit', formValidation);
}

// прокрутка к блоку преимуществ

function scrollDown() {
  var windowCoords = document.documentElement.clientHeight;
  (function scroll() {
    if (window.pageYOffset < windowCoords) {
      window.scrollBy(0, 10);
      setTimeout(scroll, 0);
    }
    if (window.pageYOffset > windowCoords) {
      window.scrollTo(0, windowCoords);
    }
  })();
}
if (btnScrollDown) {
  btnScrollDown.addEventListener('click', scrollDown);
}

// прокрутка к форме

btnPromoConsultation.addEventListener('click', function (evt) {
  evt.preventDefault();
  document.querySelector('.contact').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// маска телефона

function onEnterPhone(elem) {
  window.iMaskJS(elem, {
    mask: '+7 (000) 000 00 00'
  });
}

formInputPhone.addEventListener('input', function () {
  onEnterPhone(formInputPhone);
});

modalInputPhone.addEventListener('input', function () {
  onEnterPhone(modalInputPhone);
});
