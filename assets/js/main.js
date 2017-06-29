$(document).ready(function() {
	$.getJSON("/posts.json", function(data) {
		$('#q').keyup(function() {
			var q = $('#q').val();
			var results = [];

			if (q.length > 1) {
				$('#results').css('visibility', 'visible');

				$('#results ul').empty();

				$.each(data, function(key, result) {
					if (result.title.toLowerCase().indexOf(q) >= 0) {
						results.push(result);
					}
				});

				results.sort(function(a, b) {
					if (a.title < b.title)
						return -1;
					if (a.title > b.title)
						return 1;
					return 0;
				});
					console.log(results);
				
				$.each(results, function(key, result) {
					$('#results ul').append('<li><a href="'+result.url+'">'+result.title+'</a></li>');
				});
			} else {
				$('#results').css('visibility', 'hidden');
			}
		}); 
	}); 
});
