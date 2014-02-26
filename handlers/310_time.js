'use strict';

module.exports = function( app ){
	app.addCmd( 'time', function *( next ){
		this.write( ( Date() + '' ).cyan );
	} );
};