jQuery(function($){ // use jQuery code inside this to avoid "$ is not defined" error
	$('.blog_load_more').click(function(){
 
		var button = $(this);
		var data = {
			'action': 'c3ai_blog_loadmore',
			'query': c3ai_blog_loadmore_params.posts, // that's how we get params from wp_localize_script() function
			'page' : c3ai_blog_loadmore_params.current_page
		};
		if(button.data('query')){
			data.query = JSON.stringify(button.data('query'));
		}

		var filtered = false;

		if(button.attr('data-catfilter')){
			data.catFilter = button.attr('data-catfilter');
			filtered = true;
		}
		if(button.data('datefilter')){
			date.dateFilter = button.attr('data-datefilter');
			filtered = true;
		}

		if(filtered && button.attr('data-current_page')){
			data.page = button.attr('data-current_page');
		}
		$.ajax({ // you can also use $.post here
			url : c3ai_blog_loadmore_params.ajaxurl, // AJAX handler
			data : data,
			type : 'POST',
			beforeSend : function ( xhr ) {
				button.text('Loading...'); // change the button text, you can also add a preloader image
			},
			success : function( data ){
				if( data ) {
					var text = button.data('text') || "View More";
					var maxpages = button.attr('data-maxpages')||c3ai_blog_loadmore_params.max_page; 
					button.text( text ).parent().prev().append(data); // insert new posts
					c3ai_blog_loadmore_params.current_page++;

					if(filtered){
						button.attr('data-current_page',c3ai_blog_loadmore_params.current_page);
					}
 
					if ( c3ai_blog_loadmore_params.current_page == maxpages ) 
						button.hide(); // if last page, remove the button
 
					// you can also fire the "post-load" event here if you use a plugin that requires it
					// $( document.body ).trigger( 'post-load' );

					// Add is-visible to new results.
					// Added to event loop to allow stack to complete for animation
					setTimeout(function() {
						const $container = button.parent().prev();
						$container.find('.cell[data-reveal-animation="slide-up"]:not(.is-visible)').each(function(index, element) {
							element.classList.add('is-visible');
						});
					}, 0);
				} else {
					button.hide(); // if no data, remove the button as well
				}
			}
		});
	});
});