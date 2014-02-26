'use strict';

module.exports = function( app ){
	app.addCmd( 'die', function *(){
		var self = this;

		Object.keys( this.server.users ).forEach( function( user ){
			self.sendMsg( self.server.users[ user ], self.dieMsg || ( self.username.green + ' ran /die and took down the server.  What a jerk.'.cyan ) );
		} );

		// give the messages time to get through
		setTimeout( process.exit.bind( process ), 500 );
	} );
};