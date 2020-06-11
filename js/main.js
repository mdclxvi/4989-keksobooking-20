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
    var result = x + ', ' + y;

    var item = {
      author: {
        avatar: avatars[i]
      },
      offer: {
        title: 'Заголовок предложения',
        address: result,
        price: '20',
        type: getRandomElement(types),
        rooms: 3,
        guests: 7,
        checkin: getRandomElement(checkins),
        checkout: getRandomElement(checkouts),
        features: getRandomLenghtArray(features),
        description: '11',
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
