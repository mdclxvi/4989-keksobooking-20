'use strict';

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_ARROW_HEIGHT = 22;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
var pinMain = map.querySelector('.map__pin--main');
var mapFiltersContainer = map.querySelector('.map__filters-container');

var adForm = document.querySelector('.ad-form');
var fieldsetsAdForm = adForm.querySelectorAll('fieldset');

var addressField = adForm.querySelector('#address');
var roomNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');

var mapFilters = document.querySelector('.map__filters');
var fieldsetsMapFilters = mapFilters.querySelectorAll('fieldset');


var pinContainer = document.querySelector('.map__pins');
var widthPinContainer = pinContainer.offsetWidth;

var advertTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var buttonClose = cardTemplate.querySelector('.popup__close');

var avatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];

var types = [
  'palace',
  'flat',
  'house',
  'bungalo',
];

var checkins = [
  '12:00',
  '13:00',
  '14:00',
];

var checkouts = [
  '12:00',
  '13:00',
  '14:00',
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var disabledElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
};

var undisabledElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

var onPinPressEnter = function (evt) {
  if (evt.key === 'Enter') {
    initMap(addressField);
  }
};


var onMainPinMouseDown = function (evt) {
  if (evt.button === 0) {
    initMap(addressField);
  }
};


buttonClose.addEventListener('click', function () {
  cardTemplate.classList.add('haha');
});

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  undisabledElements(fieldsetsAdForm);
  undisabledElements(fieldsetsMapFilters);
  pinMain.removeEventListener('mousedown', onMainPinMouseDown);
  pinMain.removeEventListener('keydown', onPinPressEnter);
};

var deActivatePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  disabledElements(fieldsetsAdForm);
  disabledElements(fieldsetsMapFilters);
  addressField.value = getPinMainPosition(pinMain, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
  selectRoomsForGuests(roomNumberSelect, capacitySelect);
  pinMain.addEventListener('mousedown', onMainPinMouseDown);
  pinMain.addEventListener('keydown', onPinPressEnter);
};

var getPinMainPosition = function (el, width, height, arrowheight) {
  var left = parseFloat(el.style.left);
  var top = parseFloat(el.style.top);
  var offsetLeft = Math.round(left - width / 2);
  var offsetTop;

  if (arrowheight) {
    offsetTop = Math.round(top - (height + arrowheight) / 2);
  } else {
    offsetTop = Math.round(top - height / 2);
  }

  var pinPosition = offsetLeft + ', ' + offsetTop;

  return pinPosition;
};

var initMap = function (el) {
  activatePage();
  el.value = getPinMainPosition(pinMain, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT, MAIN_PIN_ARROW_HEIGHT);
};

adForm.addEventListener('change', function () {
  selectRoomsForGuests(roomNumberSelect, capacitySelect);
});

var selectRoomsForGuests = function (rooms, capacity) {
  var numberRooms = rooms.value;
  var numberMembers = capacity.value;

  if (numberRooms === '1' || numberRooms === '100') {
    if (numberRooms === '1') {
      capacity.selectedIndex = 0;
    } else if (numberRooms === '100') {
      capacity.selectedIndex = 3;
    }
    capacity.setAttribute('disabled', 'disabled');
  } else {
    capacity.removeAttribute('disabled');
    if (numberRooms === '2') {
      capacity.options[2].setAttribute('disabled', 'disabled');
      capacity.options[3].setAttribute('disabled', 'disabled');
      if (numberMembers === '0') {
        capacity.setCustomValidity('Выберите количество мест');
      }
    } else if (numberRooms === '3') {
      capacity.options[2].removeAttribute('disabled');
      capacity.options[3].setAttribute('disabled', 'disabled');
      if (numberMembers === '0') {
        capacity.setCustomValidity('Выберите количество мест');
      }
    }
  }
};

window.addEventListener('DOMContentLoaded', function () {
  deActivatePage();
  renderPins(pinItems, advertTemplate, PIN_WIDTH, PIN_HEIGHT, cardTemplate, mapFiltersContainer);

});

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var getRandomLenghtArray = function (arr) {
  var count = getRandomNumber(0, arr.length);
  var arrResult = arr.slice(0, count);
  return arrResult;
};

var createArrayItems = function (count, widthContainer) {

  var items = [];
  for (var i = 0; i < count; i++) {

    var x = getRandomNumber(0, widthContainer);
    var y = getRandomNumber(130, 360);
    var address = x + ', ' + y;

    var item = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        title: 'Заголовок предложения',
        address: address,
        price: '20',
        type: getRandomElement(types),
        rooms: 3,
        guests: 7,
        checkin: getRandomElement(checkins),
        checkout: getRandomElement(checkouts),
        features: getRandomLenghtArray(features),
        description: 'описание объекта',
        photos: getRandomLenghtArray(photos),
      },
      location: {
        x: x,
        y: y,
      }
    };
    items.push(item);
  }

  return items;
};

var getCollectPin = function (template, width, height, item) {

  var pinElement = template.cloneNode(true);
  var imgPin = pinElement.querySelector('img');

  pinElement.style.left = item.location.x - width / 2 + 'px';
  pinElement.style.top = item.location.y - height + 'px';
  imgPin.setAttribute('alt', item.offer.title);
  imgPin.src = item.author.avatar;

  return pinElement;
};

var pinItems = createArrayItems(8, widthPinContainer);
var fragment = document.createDocumentFragment();

var getCollectOffer = function (template, item) {

  var offerElement = template.cloneNode(true);

  var dom = {
    title: offerElement.querySelector('.popup__title'),
    address: offerElement.querySelector('.popup__text--address'),
    price: offerElement.querySelector('.popup__text--price'),
    type: offerElement.querySelector('.popup__type'),
    capacity: offerElement.querySelector('.popup__text--capacity'),
    time: offerElement.querySelector('.popup__text--time'),
    offerFeaturesContainer: offerElement.querySelector('.popup__features'),
    offerFeatures: offerElement.querySelectorAll('.popup__feature'),
    description: offerElement.querySelector('.popup__description'),
    offerPhotosContainer: offerElement.querySelector('.popup__photos'),
    offerPhoto: offerElement.querySelector('.popup__photo'),
    avatar: offerElement.querySelector('.popup__avatar'),
    buttonClose: offerElement.querySelector('.popup__close'),
  };

  dom.title.textContent = item.offer.title;
  dom.address.textContent = item.offer.address;
  dom.price.textContent = item.offer.price;
  dom.type.textContent = item.offer.type;
  dom.capacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  dom.time.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  dom.description.textContent = item.offer.description;
  dom.avatar.src = item.author.avatar;

  var featuresList = {
    wifi: 'popup__feature--wifi',
    dishwasher: 'popup__feature--dishwasher',
    parking: 'popup__feature--parking',
    washer: 'popup__feature--washer',
    elevator: 'popup__feature--elevator',
    conditioner: 'popup__feature--conditioner',
  };

  if (item.offer.photos.length > 0) {
    dom.offerPhoto.src = item.offer.photos[0];
    for (var i = 1; i < item.offer.photos.length; i++) {
      var newOfferPhoto = dom.offerPhoto.cloneNode(true);
      newOfferPhoto.src = item.offer.photos[i];
      dom.offerPhotosContainer.appendChild(newOfferPhoto);
    }
  } else {
    dom.offerPhotosContainer.remove();
  }

  if (item.offer.features.length > 0) {
    for (var j = 0; j < dom.offerFeatures.length; j++) {
      if (!item.offer.features.some(function (elem) {
        var elemClass = featuresList[elem];
        return dom.offerFeatures[j].classList.contains(elemClass);
      })) {
        dom.offerFeatures[j].remove();
      }
    }
  } else {
    dom.offerFeaturesContainer.remove();
  }

  dom.buttonClose.addEventListener('click', function () {
    offerElement.remove();
  });

  dom.buttonClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      offerElement.remove();
    }
  });

  return offerElement;
};


var renderOffer = function (el, data, template, container) {
  el.addEventListener('click', function () {
    el = getCollectOffer(template, data);
    fragment.appendChild(el);
    map.insertBefore(fragment, container);
  });
};

var clearOffer = function (items) {
  for (var i = 0; i < items.length; i++) {

  }
};

var renderPins = function (items, pinTemplate, pinWidth, pinHeight, template, container) {
  for (var i = 0; i < items.length; i++) {
    var pinItem = getCollectPin(pinTemplate, pinWidth, pinHeight, items[i]);
    fragment.appendChild(pinItem);
    renderOffer(pinItem, items[i], template, container);
  }
  pinContainer.appendChild(fragment);
};


// var ooops = renderOffers(cardTemplate, pinItems);

// console.log(ooops);

