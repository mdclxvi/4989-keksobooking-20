'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapFiltersContainer = map.querySelector('.map__filters-container');

var pinContainer = document.querySelector('.map__pins');
var widthPinContainer = pinContainer.offsetWidth;

var advertTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var getRandomLenghtArray = function (arr) {
  var count = getRandomNumber(1, arr.length);
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

for (var i = 0; i < pinItems.length; i++) {
  var pinItem = getCollectPin(advertTemplate, PIN_WIDTH, PIN_HEIGHT, pinItems[i]);
  fragment.appendChild(pinItem);
}

pinContainer.appendChild(fragment);

var getCollectOffer = function (template, item) {

  var offerElement = template.cloneNode(true);
  var title = offerElement.querySelector('.popup__title');
  var address = offerElement.querySelector('.popup__text--address');
  var price = offerElement.querySelector('.popup__text--price');
  var type = offerElement.querySelector('.popup__type');
  var capacity = offerElement.querySelector('.popup__text--capacity');
  var time = offerElement.querySelector('.popup__text--time');
  var offerFeatures = offerElement.querySelectorAll('.popup__feature');
  var description = offerElement.querySelector('.popup__description');
  var offerPhotosContainer = offerElement.querySelector('.popup__photos');
  var offerPhoto = offerElement.querySelector('.popup__photo');
  var avatar = offerElement.querySelector('.popup__avatar');

  title.textContent = item.offer.title;
  address.textContent = item.offer.address;
  price.textContent = item.offer.price;
  type.textContent = item.offer.type;
  capacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  time.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  description.textContent = item.offer.description;
  avatar.src = item.author.avatar;

  var photosArr = item.offer.photos;
  var featuresArr = item.offer.features;

  for (var j = 0; j < photosArr.length; j++) {
    if (photosArr.length > 1) {
      var newEl = offerPhoto.cloneNode(true);
      newEl.src = photosArr[j];
      offerPhotosContainer.appendChild(newEl);
    } else {
      offerPhoto.src = photosArr[j];
    }
  }

  for (var k = 0; k < featuresArr.length; k++) {
    offerFeatures[k].textContent = featuresArr[k];
    if (offerFeatures[k].textContent.length === 0) {
      offerFeatures[k].style.display = 'none';
    }
  }

  return offerElement;
};

for (var j = 0; j < 1; j++) {
  var offerItem = getCollectOffer(cardTemplate, pinItems[0]);
  fragment.appendChild(offerItem);
}

map.insertBefore(fragment, mapFiltersContainer);


