'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinContainer = document.querySelector('.map__pins');
var widthPinContainer = pinContainer.offsetWidth;

var advertTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

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


var advertCard = {
  avatars: avatars,
  types: types,
  checkins: checkins,
  checkouts: checkouts,
  features: features,
  photos: photos,
};


var getRandomValue = function (max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var createArrayAdverts = function (countAdvert, widthContainer) {

  var adverts = [];
  for (var i = 0; i < countAdvert; i++) {
    var advert = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350',
        price: '20',
        type: getRandomElement(types),
        rooms: 3,
        guests: 7,
        checkin: getRandomElement(checkins),
        checkout: getRandomElement(checkouts),
        features: getRandomElement(features),
        description: '11',
        photos: getRandomElement(photos)
      },
      location: {
        x: getRandomValue(widthContainer, 0),
        y: getRandomValue(360, 130),
      }
    };
    adverts.push(advert);
  }

  return adverts;
};

var renderPin = function (template, width, height, advert) {

  var pinElement = template.cloneNode(true);
  pinElement.style.left = advert.location.x - width / 2 + 'px';
  pinElement.style.top = advert.location.y - height + 'px';
  pinElement.querySelector('img').setAttribute('alt', advert.offer.title);
  pinElement.querySelector('img').src = advert.author.avatar;

  return pinElement;
};

var adverts = createArrayAdverts(8, widthPinContainer, advertCard);

var fragment = document.createDocumentFragment();

for (var i = 0; i < adverts.length; i++) {
  fragment.appendChild(renderPin(advertTemplate, PIN_WIDTH, PIN_HEIGHT, adverts[i]));
}

pinContainer.appendChild(fragment);

