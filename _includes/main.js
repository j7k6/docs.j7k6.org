'use strict';

const inputElement = document.querySelector('input[name=q]');
const allItems = [...document.querySelectorAll('ul.index li')];

if (inputElement !== null) {
  let timeout;

  inputElement.addEventListener('keyup', function(e) {
    let q = '';

    if (e.keyCode === 27) {
      q = inputElement.value = '';
    } else {  
      q = inputElement.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/(\s\s+|\s)/g, ' ');

      let qc = q.replace(/\\/, '')

      if (qc.length === 1) {
        allItems.forEach(el => el.style.display='block');
      }

      if (qc.length > 1) {
        clearTimeout(timeout);

        timeout = setTimeout(function() {
          allItems.forEach(el => el.style.display='none');

          let queryWords = q.split(' ').map(word => `(?=.*${word}.*)`).join('');
          let matchItems = allItems.filter(el => el.querySelector('a').innerText.match(new RegExp(`^(${queryWords}.+)`, 'i')));

          matchItems.forEach(el => el.style.display='block');
          matchItems.forEach(el => el.querySelector('a').innerHTML = el.querySelector('a').innerText.replace(new RegExp(q.split(' ').join('|'), 'gi'), match => `<strong>${match}</strong>`));
        }, 100);
      }
    }

    if (q.length === 0) {
      [...document.querySelectorAll('ul.index li a strong')].forEach(el => el.replaceWith(...el.childNodes));

      allItems.forEach(el => el.style.display='none');
      allItems.filter(el => el.classList.contains('fav')).forEach(el => el.style.display='block');
    }
  });
}

// variable highlighter
[...document.querySelectorAll('article code')].forEach(el => el.innerHTML = el.innerText.replace(/<([^$].*)>/gi, '&lt;$1&gt;').replace(/<\$([A-Z0-9_]+)>/g, match => `<span class="var">${match}</span>`));
