'use strict';

module.exports = function( app ){
	app.addCmd( 'quit', function *( next ){
		this.end( 'BYE'.cyan );

		// leave current room
		yield* this.runCmd( 'leave' );

		// remove from user list
		if( this.username ){
			delete this.server.users[ this.username ];
		}
	} );
};