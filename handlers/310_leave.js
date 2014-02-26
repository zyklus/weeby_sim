'use strict';

module.exports = function( app ){
	app.addCmd( 'leave', function *( next ){
		if( !this.activeRoom ){
			return this.write( 'Not currently in a room'.red );
		}

		var        msg = ' * user has left chat: '.cyan + this.username.green
		  , activeRoom = this.server.rooms[ this.activeRoom ]
		  ;

		this.write( msg + ' (** this is you)'.cyan );

		// remove user from room
		for( var i=activeRoom.length-1; i>=0; i-- ){
			if( activeRoom[i] === this.username ){
				activeRoom.splice( i, 1 );
			}
		}

		// delete room if empty
		if( !activeRoom.length ){
			delete this.server.rooms[ this.activeRoom ];
		}

		this.sendMsg( this.activeRoom, msg );
		this.activeRoom = null;
	} );
};