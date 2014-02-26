'use strict';

module.exports = function( app ){
	app.addCmd( 'join', function *( next ){
		var room = this.cmdData
		  , self = this
		  ;

		if( /[^a-z]/i.test( room ) ){
			return this.write( 'Invalid room name'.red );
		}

		var buffer = this.buffer;
		yield* this.runCmd( 'leave' );
		this.buffer = buffer;

		if( !this.server.rooms[ room ] ){
			this.server.rooms[ room ] = []; // array of connected users
		}

		this.sendMsg( room, ' * new user joined chat: '.cyan + this.username.green );

		this.activeRoom = room;
		this.roomIx     = this.server.rooms[ room ].length;
		this.server.rooms[ room ].push( this.username );

		this.write( 'entering room: '.cyan + room.green.underline );

		this.write( this.server.rooms[ room ].map(
			function( username ){
				return ' * '.cyan + username.green + ( ( username === self.username ) ? ' (** this is you)'.cyan : '' );
			}
		).concat( 'end of list.'.cyan ).join( '\n' ) );
	} );
};