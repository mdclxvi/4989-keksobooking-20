'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createObjectAdvert = function () {
  var advert = {
    author: {
      avatar: '1'
    },
    offer: {
      title: '2',
      address: '3',
      price: '4',
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

var getRandomValue = function (inputValue) {

  for (var i = 0; i < inputValue.length; i++) {
    var length = inputValue.length;
    var randomValue = inputValue[Math.floor(Math.random() * (length - 0)) + 0];
  }

  return randomValue;
};

var haha = createObjectAdvert();

var ooops = createArrayAdverts(8, haha);
console.log(ooops);

