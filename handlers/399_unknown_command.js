'use strict';

module.exports = function( app ){
	app.addHandler( function *( next ){
		if( this.data.indexOf( '/' ) ){ return yield next; }

		this.write( 'Unknown command: '.red + this.data.split( /\s/ )[0] );
	} );
};