'use strict';

module.exports = function( app ){
	app.addCmd( 'reply', function *( next ){
		if( !this.lastMsgFrom ){
			return this.write( 'Nobody to reply to'.red );
		}

		yield* this.runCmd( 'msg', this.lastMsgFrom + ' ' + this.cmdData );
	} );
};