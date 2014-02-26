'use strict';

module.exports = function( app ){
	app.addCmd( 'follow', function *( next ){
		var user = this.cmdData
		  , room
		  ;

		if( !user ){
			return this.write( 'Invalid /follow'.red );
		}else if( !this.server.users[ user ] ){
			return this.write( 'Unknown user: '.red + user.green );
		}else if( !( room = this.server.users[ user ].activeRoom ) ){
			return this.write( 'User '.red + user.green + ' is not currently in any room'.red );
		}

		yield* this.runCmd( 'join', room );
	} );
};