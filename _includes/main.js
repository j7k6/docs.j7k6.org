'use strict';

const inputElement = document.querySelector('header.index h1 a');
const allItems = [...document.querySelectorAll('ul.index li')];

if (inputElement != null) {
  let q = '';
  let timeout;

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  });

  document.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) {
      q = '';
    } else if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 32 || String.fromCharCode(e.keyCode).match(/[0-9a-z]/i)) {
      if (e.keyCode === 8 || e.keyCode === 46) {
        q = q.slice(0, -1);
      } else { 
        q += e.key;
      }

      inputElement.innerHTML = q;

      let qc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/(\s\s+|\s)/g, ' ').replace(/\\/, '');

      if (qc.length === 1) {
        allItems.forEach(el => el.style.display='block');
      }

      if (qc.length > 1) {
        clearTimeout(timeout);

        timeout = setTimeout(function() {
          allItems.forEach(el => el.style.display='none');

          let queryWords = q.split(' ').map(word => `(?=.*${word}.*)`).join('');
          let matchItems = allItems.filter(el => el.querySelector('a').innerText.match(new RegExp(`^(${queryWords}.+)`, 'i')));

          if (matchItems.length === 0) {
            document.querySelector('div.nores').style.display = 'block';
          } else {
            document.querySelector('div.nores').style.display = 'none';
          }

          matchItems.forEach(el => el.style.display='block');
          matchItems.forEach(el => el.querySelector('a').innerHTML = el.querySelector('a').innerText.replace(new RegExp(q.split(' ').join('|'), 'gi'), match => `<strong>${match}</strong>`));
        }, 100);
      }
    }

    if (q.length === 0) {
      [...document.querySelectorAll('ul.index li a strong')].forEach(el => el.replaceWith(...el.childNodes));

      allItems.forEach(el => el.style.display='none');
      allItems.filter(el => el.classList.contains('fav')).forEach(el => el.style.display='block');

      inputElement.innerHTML = 'My Sysadmin Cheatsheet';
    }
  });
}

// variable highlighter
[...document.querySelectorAll('article code')].forEach(el => el.innerHTML = el.innerText.replace(/<([^$].*)>/gi, '&lt;$1&gt;').replace(/<\$([A-Z0-9_]+)>/g, match => `<span class="var">${match}</span>`));
