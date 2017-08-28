$(document).ready(function() {
  if(window.location.hash.substring(1).match(/^comment/gi)) {
    $('#comments').show();
  }

  $('.disqus_count').click(function(e) {
    $('#comments').show();
  });

	$.getJSON("/posts.json", function(data) {
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
            var queryWords = q.split(" ");

            for (var i=0; i<queryWords.length; i++) {
              queryWords[i] = '(?=.*'+queryWords[i]+'.*)';
            }

            var re = new RegExp(queryWords.join("")+'.+', 'i');

            if (result.title.match(re)) {
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
              if (new Date(a.date) < new Date(b.date))
                return 1;
              if (new Date(a.date) > new Date(b.date))
                return -1;
              return 0;
            });

            $.each(results, function(key, result) {
              $('.results ul').append('<li><a href="'+result.url+'">'+result.title+'</a> <em>'+result.date_formatted+'</em></li>');
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
