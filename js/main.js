'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
]

var createObjectAdvert = function () {
  var advert = {
    author: {
      avatar: 'img/avatars/user{{xx}}.png'
    },
    offer: {
      title: 'Заголовок предложения',
      address: '600, 350',
      price: '20',
      type: '5',
      rooms: '6',
      guests: '7',
      checkin: '8',
      checkout: '9',
      features: '10',
      description: '11',
      photos: '12'
    },
    location: {
      x: '13',
      y: '14',
    }
  };
  return advert;
};

var createArrayAdverts = function (length) {
  var adverts = [];
  for (var i = 0; i < length; i++) {
    adverts.push(createObjectAdvert());
  }

  return adverts;
};

var getRandomValue = function (max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var haha = createObjectAdvert();

var ooops = getRandomValue(630, 130);
console.log(ooops);

