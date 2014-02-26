'use strict';

module.exports = function( app ){
	app.addHandler( function *( next ){
		if( !this.activeRoom ){
			return this.write( 'You are not in a room'.red );
		}

		this.sendMsg( this.activeRoom, this.username + ': ' + this.data );
	} );
};