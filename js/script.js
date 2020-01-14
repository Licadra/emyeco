jQuery(function($){ // use jQuery code inside this to avoid "$ is not defined" error
	var blogFilters = $(".blog-page-filters");
	if(blogFilters.length == 0) return;
	blogFilters.find('select').change(function(){
		var catFilter = blogFilters.find('.category-filter').val();
		var dateFilter = blogFilters.find('.date-filter').val();

		var innerContent = $('.inner-content');
 		var loadMoreBtn = $('.blog_load_more');
		var data = {
			action: 'c3ai_blog_filter',
			query: c3ai_blog_filter_params.posts,
			catFilter:catFilter,
			dateFilter:dateFilter
		};

		if ( blogFilters.data('post-type') !== null ) {
			data.postType = blogFilters.data('post-type');
		}

		if ( blogFilters.data('taxonomy') !== null ) {
			data.postTaxonomy = blogFilters.data('taxonomy');
		}

		$.ajax({ // you can also use $.post here
			url : c3ai_blog_filter_params.ajaxurl, // AJAX handler
			data : data,
			type : 'POST',
			beforeSend : function ( xhr ) {
				innerContent.text('Loading...'); // change the button text, you can also add a preloader image
				loadMoreBtn.hide(); // Hide load more button for now
			},
			success : function( response ){
				if( response.data ) {
					var maxpages = response.max_num_pages;
					if ( ! maxpages && maxpages !== 0 ) maxpages = c3ai_blog_filter_params.max_page; 
					innerContent.html(response.data); // insert new posts
 					loadMoreBtn.attr('data-catfilter',catFilter);
 					loadMoreBtn.attr('data-datefilter',dateFilter);
 					loadMoreBtn.attr('data-current_page', 1);
 					loadMoreBtn.attr('data-maxpages', maxpages);
					if ( maxpages > 1 ) {
						loadMoreBtn.show(); // if last page, remove the button
					}

					// Add is-visible to filtered results.
					// Added to event loop to allow stack to complete for animation
					setTimeout(function() {
						innerContent.find('.cell[data-reveal-animation="slide-up"]:not(.is-visible)').each(function(index, element) {
							element.classList.add('is-visible');
						});
					}, 0);
				}
				else {
					innerContent.html("<h2>No results found.</h2>");
				}
			}
		});
	});
});