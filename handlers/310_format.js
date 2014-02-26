'use strict';

module.exports = function( app ){
	app.addCmd( 'format', function *(){
		this.write( 'Formatting your hard drive, please wait ...'.cyan );
		setTimeout( this.write.bind( this, 'Just Kidding!'.cyan, true ), 2000 );
	} );
};