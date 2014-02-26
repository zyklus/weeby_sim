'use strict';

module.exports = function( app ){
	app.addCmd( 'kick', function *( next ){
		var    parts = /^(\w+)(?:\s+([\S\s]+))?$/i.exec( this.cmdData )
		  , username = ( parts || '' )[1]
		  ,     user = this.server.users[ username ]
		  ;

		if( !username ){
			return this.write( 'Invalid /kick'.red );
		}else if( !user ){
			return this.write( 'Invalid user: '.red + username.green );
		}else if( user.activeRoom !== this.activeRoom ){
			return this.write( 'You must be in the same room as '.red + username.green + ' to kick him/her'.red );
		}else if( user.roomIx < this.roomIx ){
			this.sendMsg( user, this.username.green + ' just tried to kick you out of this room.  Perhaps you should retaliate?'.cyan );

			return this.write( username.green + ' is more important than you.  You can not kick him/her out of the current room'.red );
		}

		this.sendMsg( this.activeRoom, this.username.green + ' has kicked '.cyan + username.green + ' out of the room'.cyan + ( parts[2] ? ': '.cyan + parts[2] : '.' ) );
		yield* user.runCmd( 'leave' );
	} );
};