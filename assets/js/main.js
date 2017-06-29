$(document).ready(function() {
	$.getJSON("/posts.json", function(data) {
    var currentFocus;
    var resultList = $('.results ul li');

    $('.results ul').mousemove(function(e) {
      $('.results ul li.focus').removeClass('focus');
      currentFocus = $(this).addClass('focus');
    });

		$('#q').keyup(function(e) {
      $('#q').val($('#q').val());

      if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 27 || e.keyCode === 13) {
        if (e.keyCode === 38) { // UP
          if (currentFocus) {
            if (currentFocus.prev().length === 0) {
              currentFocus.removeClass('focus');
              delete currentFocus;
              $('#q').focus();
            } else {
              currentFocus = currentFocus.removeClass('focus').prev().addClass('focus');
            }
          }
        }

        if (e.keyCode === 40) { // DOWN
          if (!currentFocus) {
            currentFocus = $('.results ul li').first().addClass('focus');
          } else {
            if (currentFocus.next().length === 0) {
              currentFocus.removeClass('focus');
              currentFocus = $('.results ul li').first().addClass('focus');
            } else {
              currentFocus = currentFocus.removeClass('focus').next().addClass('focus');
            }
          }
        }

        if (e.keyCode === 13) { // ENTER
          window.location.href = currentFocus.children('a').first().attr('href');
        }

        if (e.keyCode === 27) { // ESC
          if ($('#q').val().length === 0) {
            $('#q').blur();
          } else {
            delete currentFocus;
            $('#q').val('');
            $('#q').keyup();
          }
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

          if (results.length > 0) {
            $('.results').css('visibility', 'visible');
            $('.results ul').empty();

            results.sort(function(a, b) {
              if (a.title < b.title)
                return -1;
              if (a.title > b.title)
                return 1;
              return 0;
            });

            $.each(results.slice(0, 10), function(key, result) {
              $('.results ul').append('<li><a href="'+result.url+'">'+result.title+'</a></li>');
            });
          } else {
            $('.results').css('visibility', 'hidden');
          }
        } else {
          $('.results').css('visibility', 'hidden');
        }
      }
		});
	});
});
