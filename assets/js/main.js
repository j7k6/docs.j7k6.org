$(document).ready(function() {
	$.getJSON("/posts.json", function(data) {
		$('#q').keyup(function() {
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
					$('#results').css('visibility', 'visible');
					$('#results ul').empty();

					results.sort(function(a, b) {
						if (a.title < b.title)
							return -1;
						if (a.title > b.title)
							return 1;
						return 0;
					});
					
					$.each(results, function(key, result) {
						$('#results ul').append('<li><a href="'+result.url+'">'+result.title+'</a></li>');
					});
				} else {
					$('#results').css('visibility', 'hidden');
				}
			} else {
				$('#results').css('visibility', 'hidden');
			}
		}); 
	}); 
});
