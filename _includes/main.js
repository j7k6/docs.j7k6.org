'use strict';

if (document.querySelector('input[name=q]') !== null) {
  const allItems = [...document.querySelectorAll('ul.index li')];

  document.querySelector('input[name=q]').addEventListener('keyup', function(e) {
    let q; 

    if (e.keyCode === 27) {
      q = document.querySelector('input[name=q]').value = '';
    } else {
      q = document.querySelector('input[name=q]').value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s\s+/g, ' ');
    }

    if (q.replace(/\\/, '').length > 1) {
      allItems.forEach(el => el.style.display='none');

      let queryWords = q.split(' ').map(word => `(?=.*${word}.*)`).join('');
      let matchItems = allItems.filter(el => el.querySelector('a').innerText.match(new RegExp(`^(${queryWords}.+)`, 'i')));

      matchItems.forEach(el => el.style.display='block');
      matchItems.forEach(el => el.querySelector('a').innerHTML = el.querySelector('a').innerText.replace(new RegExp(q.split(' ').join('|'), 'gi'), match => `<strong>${match}</strong>`));
    } else {
      [...document.querySelectorAll('ul.index li a strong')].forEach(el => el.replaceWith(...el.childNodes));

      allItems.forEach(el => el.style.display='none');
      allItems.filter(el => el.classList.contains('fav')).forEach(el => el.style.display='block');
    }
  });
} else {
  [...document.querySelectorAll('code')].forEach(el => el.innerHTML = el.innerText.replace(/<(\$[A-Z|_|0-9]+)>/g, match => `<span class="var">${match}</span>`));
}
