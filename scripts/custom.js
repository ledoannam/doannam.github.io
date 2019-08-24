$(document).ready(function () {
														

    // Solve Z-index problem in Internet Explorer 7 ================================================= */
    $(function () {
        var zIndexNumber = 1000;
        $('div span').each(function () {
            $(this).css('zIndex', zIndexNumber);
            zIndexNumber -= 10;
        });
    });
	
	
	// start : Cufon Replacement JS ================================================================= */
	Cufon.replace ('h2') ('h3') ('.p1') ('li.title') ('label') ('.text1');
	
	
	
	// Progress bar ================================================================================= */				
	var progress_key = '';

		$("#pb1").progressBar({ barImage: './images/progress.png', showText: true} );


	// Start AJAX Subscriber Form JS ================================================================= */

	var options = { 
	target:  '#warning'
	}; 
	$('#newsletter-form').ajaxForm(options); 

	
	
	// Subscribers Form AJAX Loader Image ============================================================ */

		$(".loader").hide();
		
		$('form#newsletter-form').bind('submit', function(e){
			$(".loader").show();
					var mail = $('input#email').val();
			e.preventDefault();
			
			$.ajax({
				type: 'POST',
				url: 'subscriber.php',
				data: '',
				success: function(theResponse){
					$(".loader").hide();
				},
				error: function(){
					$(".loader").hide();
				}		
			});
		});


    // close button ================================================================================= */
	
	$('#contact .close').click(function () { $('#contact').animate({ height: "toggle", "bottom": "20" }, "medium"); return false; 			});




    // Show contact form when clicked =============================================================== */
    $('#icons .contacts').click(function () { $('#contact').animate({ "height": "toggle", "bottom": "14" }, "medium"); return false; });




	// Contact Form ================================================================================= */
	$("#contact-form").submit(function(){
		var str = $(this).serialize();
				
		
		//show the loader
		$(".bar").show();
		$(".button").hide();
				
		$.ajax({
			type: "POST",
			url: "./php/send.php",
			data: str,
			success: function(msg)
				{
					$("#formstatus").ajaxComplete(function(event, request, settings){
						if(msg == 'OK'){ // Message Sent? Show the 'Thank You' message and hide the form
							result = '<div class="formstatusok">Your message has been sent. Thank you!</div><br> <div class="sent_img"></div>';
							
							
	   						$("#name").fadeOut(700);
							$("#email").fadeOut(700);
							$("#message").fadeOut(700);
							$("label").fadeOut(700);
							$(".button").hide();
							$(".bar").hide();
							$('#contact').delay(2100).animate({ height: "toggle", "bottom": "20" }, "medium");
							msg = 'no';
							
						}
						
						if (msg == 'no')
						{
							result = '<div class="formstatusok">Your message has been sent. Thank you!</div><br> <div class="sent_img"></div>';
							$(".button").hide();
						}
					
						else {	
							result = msg;
							$(".bar").hide();
							$(".button").show();
						}
						$(this).html(result);
					});
				}
				});
			return false;
		});

});
