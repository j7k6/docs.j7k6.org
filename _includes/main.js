'use strict';

const allItems = [...document.querySelectorAll('ul.index li')];
const favItems = [...document.querySelectorAll('ul.index li.fav')];

document.querySelector('input[name=q]').addEventListener('keyup', function(e) {
  let q; 

  if (e.keyCode === 27) {
    q = document.querySelector('input[name=q]').value = '';
  } else {
    q = document.querySelector('input[name=q]').value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s\s+/g, ' ');
  }

  if (q.replace(/\\/, '').length > 1) {
    allItems.forEach((el) => el.style.display='none');

    let queryWords = q.split(' ').map(word => `(?=.*${word}.*)`).join('');
    let matchItems = [...document.querySelectorAll('ul.index li')].filter(el => el.querySelector('a').innerText.match(new RegExp(`^(${queryWords}.+)`, 'i')));

    matchItems.forEach((el) => el.style.display='block');
    matchItems.forEach((el) => el.querySelector('a').innerHTML = el.querySelector('a').innerText.replace(new RegExp(q.split(' ').join('|'), 'gi'), match => `<strong>${match}</strong>`));
  } else {
    [...document.querySelectorAll('ul.index li a strong')].forEach((el) => el.replaceWith(...el.childNodes));

    allItems.forEach((el) => el.style.display='none');
    favItems.forEach((el) => el.style.display='block');
  }
});

