function emyecoAIprediction() {
 
	// get inputs
	var emyecoAIstocks = new Object();
	emyecoAIstocks.symbol = $('#symbol').val();
	emyecoAIstocks.name = $('#name').val();
	emyecoAIstocks.currency = $('#currency').val();
	emyecoAIstocks.price = $('#price').val();
	emyecoAIstocks.price_open = $('#price_open').val();
	emyecoAIstocks.day_high = $('#day_high').val();
        emyecoAIstocks.day_low = $('#day_low').val();
	emyecoAIstocks.week_high = $('#week_high').val();
	emyecoAIstocks.week_low = $('#week_low').val();
	emyecoAIstocks.day_change = $('#day_change').val();
	emyecoAIstocks.change_pct = $('#change_pct').val();
	emyecoAIstocks.close_yesterday = $('#close_yesterday').val();
        emyecoAIstocks.market_cap = $('#market_cap').val();
	emyecoAIstocks.volume = $('#volume').val();
	emyecoAIstocks.volume_avg = $('#volume_avg').val();
	emyecoAIstocks.shares = $('#shares').val();
	emyecoAIstocks.stock_exchange_long = $('#stock_exchange_long').val();
	emyecoAIstocks.stock_exchange_short = $('#stock_exchange_short').val();
        emyecoAIstocks.timezone = $('#timezone').val();
	emyecoAIstocks.timezone_name = $('#timezone_name').val();
	emyecoAIstocks.gmt_offset = $('#gmt_offset').val();
	emyecoAIstocks.last_trade_time = $('#last_trade_time').val();
	emyecoAIstocks.pe = $('#pe').val();
	emyecoAIstocks.eps = $('#eps').val
        emyecoAIstocks.given_value = $('#given_value').val();
        
        
        
        
        
        
        
        
        
        
	//emyecoAIstocks.url = $('#url').val();
	//emyecoAIstocks.categories = $('#categories').val().split(";");
	//emyecoAIstocks.tags = $('#tags').val().split(";");
	
	$.ajax({
		url: "emyestocksAI",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(emyecoAIstocks),
		contentType: 'application/json',
		mimeType: 'application/json',
		
		success: function (data) {
        	$("tr:has(td)").remove();

        	$.each(data, function (emyecostocksAI, emyecoAIstocks) {
            	
                
               /** 
                var td_categories = $("<td/>");
                $.each(emyecoAIstocks.categories, function (i, tag) {
                	var span = $("<span class='label label-info' style='margin:4px;padding:4px' />");
                	span.text(tag);
                	td_categories.append(span);
                });
                
                var td_tags = $("<td/>");
                $.each(emyecoAIstocks.tags, function (i, tag) {
                	var span = $("<span class='label' style='margin:4px;padding:4px' />");
                	span.text(tag);
                	td_tags.append(span);
                });
                
                */
                
                
                $("#added-articles").append($('<tr/>')
                
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.symbol+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.name+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.currency+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.price+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.price_open+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.day_high+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.day_low+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.week_high+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.week_low+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.day_change+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.change_pct+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.close_yesterday+"</a>"))
                                .append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.market_cap+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.volume+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.volume_avg+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.shares+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.stock_exchange_long+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.stock_exchange_short+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.timezone+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.timezone_name+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.gmt_offset+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.last_trade_time+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.pe+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.eps+"</a>"))
                                .append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.given_value+"</a>"))
                		.append($('<td/>').html("<a href='"+emyecoAIstocks.url+"'>"+emyecoAIstocks.predicted_value+"</a>"))
                            
                            
                            
                            
                           // .append(td_categories)
                	//	.append(td_tags)
                );
            
                
            }); 
        },
		error:function(data,status,er) {
			alert("error: "+data+" status: "+status+" er:"+er);
		}
	});
}