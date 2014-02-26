'use strict';

module.exports = function( app ){
	app.addCmd( 'echo', function *( next ){
		if( !this.activeRoom ){
			return this.write( 'Must be in a room to /echo'.red );
		}

		//                 (cmd)     (args)
		var parts = /^\s*\/(\S+)(?:\s+(.*))?$/.exec( this.cmdData );

		if( !parts ){
			return this.write( 'Invalid /echo'.red );
		}

		yield* this.runCmd( parts[1], parts[2] || '' );
		var output  = this.buffer;
		this.buffer = '';

		this.sendMsg( this.activeRoom, this.username.green + ' ECHO: '.cyan + output );
	} );
};