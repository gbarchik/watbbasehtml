(function($) {
	
	/* Functions
	------------------------ */
	
	
	
	/* Triggers
	------------------------ */
	// Document Ready
	$(document).ready( function() {
		// LiveReload
		if( location.hostname.indexOf( 'localhost' ) !== -1 ) {
			var liveReload = $( '<script />' );
			liveReload
				.attr( 'src', '//localhost:35729/livereload.js' )
				.appendTo( 'body' );
		}
	});
	
	
	
})(jQuery);