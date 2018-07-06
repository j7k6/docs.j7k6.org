$(document).ready(function() {
  var disqusShortname = 'j7k6';
  var disqusLoaded = false;

	function loadDisqus() {
    if (!disqusLoaded) {
      disqusLoaded = true;

      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//'+disqusShortname+'.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (document.head || document.body).appendChild(s);
      $('#comments').show();
    }
  }

  if(window.location.hash.substring(1).match(/^comment/gi)) {
    loadDisqus();
  }

  $('.disqus_count').click(function(e) {
    loadDisqus();
  });

  $('article code').each(function() {
    $(this).html($(this).text().replace(/<(\$)([A-Z|_|0-9]+)>/g, '<span class="var">&lt;$2&gt;</span>'));

    $(this).find('*').not('span.var').parent().each(function() {
      $(this).text($(this).html().replace(/([^a-z])(&gt;)/gi, '$1>').replace(/(&lt;)([^a-z])/gi, '<$2'));
    });
  });

	$.getJSON('/posts.json', function(data) {
    var resultList = $('.results ul li');

		$('#q').keyup(function(e) {
      $('#q').val($('#q').val());

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
        var results = [];

        if (q.length > 1) {
          $.each(data, function(key, result) {
            var queryWords = q.split(/\s/);

            for (var i=0; i<queryWords.length; i++) {
              queryWords[i] = '(?=.*'+queryWords[i]+'.*)';
            }

            if (result.title.match((new RegExp(queryWords.join('')+'.+', 'i')))) {
              results.push(result);
            }
          });

          $('.content').hide(function() {
            $('.results').show(function() {
              $('.results h3').html(results.length+' Results');
            });
          });
          $('.results ul').empty();

          if (results.length > 0) {
            results.sort(function(a, b) {
              return (new Date(a.date) < new Date(b.date)) ? 1 : -1;
              return 0;
            });

            $.each(results, function(key, result) {
              var matchTitle = result.title.replace((new RegExp(q.split(/\s/).join('|'), 'gi')), match => `<strong>${match}</strong>`);

              $('.results ul').append('<li><a href="'+result.url+'">'+matchTitle+'</a> <em>'+result.date_formatted+'</em></li>');
            });
          }
        } else {
          $('.content').show(function() {
            $('.results').hide();
          });
        }
      }
		});
	});
});
