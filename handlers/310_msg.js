'use strict';

module.exports = function( app ){
	app.addCmd( 'msg', function *( next ){
		//           (user)   (  msg  )
		var parts = /^(\w+)\s+([\S\s]+)$/i.exec( this.cmdData )
		  , toUser;

		if( !parts ){
			return this.write( 'Invalid /msg'.red );
		}else if( !( toUser = this.server.users[ parts[1] ] ) ){
			return this.write( 'Unknown user: '.red + parts[1].green );
		}

		toUser.lastMsgFrom = this.username;

		this.sendMsg( toUser, '<private> '.cyan + this.username.green + ': '.cyan + parts[2] );
		this.write( 'Message sent to: '.cyan + parts[1].green );
	} );
};