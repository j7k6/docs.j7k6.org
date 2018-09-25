$(document).ready(function() {
  $('article code').each(function() {
    $(this).html($(this).text().replace(/<(\$)([A-Z|_|0-9]+)>/g, '<span class="var">&lt;$2&gt;</span>'));

    $(this).find('*').not('span.var').parent().each(function() {
      $(this).text($(this).html().replace(/([^a-z])(&gt;)/gi, '$1>').replace(/(&lt;)([^a-z])/gi, '<$2'));
    });
  });


  // ----------


  var showAll = false;

  $('.search span').click(function() {
    if (showAll === false) {
      $(this).addClass('all');
      $('ul.index li').show();
      showAll = true;
    } else {
      $(this).removeClass('all');
      $('ul.index li:not(.fav)').hide();
      showAll = false;
    }
  });


  // ----------


  $('#q').keyup(function(e) {
    $('#q').val($('#q').val());
    showAllState = showAll;

    if (e.keyCode === 27) { // ESC
      if ($('#q').val().length === 0) {
        $('#q').blur();
      } else {
        delete currentFocus;
        $('#q').val('');
        $('#q').keyup();
      }
    } else {
      var q = $('#q').val();
      var queryWords = q.split(/\s/);

      if (q.length > 1) {
        showAll = false;
        $('.search span').click();
        $('ul.index li').hide();
        
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
        $('ul.index li').hide();
        $('ul.index li.fav').show();

        showAll = (showAllState ? false : true);
        $('.search span').click();
      }
    };
	});
});
