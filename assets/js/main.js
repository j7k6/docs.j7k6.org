$(document).ready(function() {
  if ($('.index')[0]) {
    var q = '';

    $(document).keydown(function(e) {
      switch(e.keyCode) {
        case 8:
          e.preventDefault();

          if (q.length > 0) {
            q = q.substring(0, (q.length - 1));
          }

          break;
        case 32:
          e.preventDefault();
          break;
      }
    });

    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
          q = '';
      }

      if (e.key.length === 1) {
        q = q.replace(/  /g, ' ') + e.key;  
      }

      if (q.length > 1) { 
        $('ul.index li').hide();

        var queryWords = q.split(/\s/);
        
        for (var i=0; i<queryWords.length; i++) {
          queryWords[i] = '(?=.*'+queryWords[i]+'.*)';
        }

        $('ul.index li a').not(function() {
          return $(this).text().match(new RegExp('^(?!('+queryWords.join('')+'.+))', 'i'));
        }).parent().show();

        $('ul.index li:visible a').each(function() {
          $(this).html($(this).text().replace((new RegExp(q.split(/\s/).join('|'), 'gi')), match => `<strong>${match}</strong>`));
        });
      } else {
        $('ul.index li a strong').contents().unwrap();
        $('ul.index li').show();
      }
    });
  }
});
