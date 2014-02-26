'use strict';

module.exports = function( app ){
	app.addCmd( 'whereis', function *( next ){
		var user = this.cmdData.split( /\s+/ )[0]
		  , room
		  ;

		if( !user ){
			return this.write( 'Invalid /whereis'.red );
		}else if( !this.server.users[ user ] ){
			return this.write( 'Unknown user: '.red + user.green );
		}else if( !( room = this.server.users[ user ].activeRoom ) ){
			return this.write( 'User '.red + user.green + ' is not currently in any room'.red );
		}

		this.write( 'User '.cyan + user.green + ' is currently in the room: '.cyan + room.green.underline )
	} );
};