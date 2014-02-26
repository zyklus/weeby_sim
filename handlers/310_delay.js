'use strict';

var Promise = require( 'bluebird' );

module.exports = function( app ){
	app.addCmd( 'delay', function *( next ){
		//               (sec)     (cmd)     (args)
		var parts = /^\s*(\d+)\s+\/(\S+)(?:\s+(.*))?$/.exec( this.cmdData );

		if( !parts ){
			return this.write( 'Invalid /delay'.red );
		}

		yield delay( 1000 * parseInt( parts[1] ) );

		yield* this.runCmd( parts[2], parts[3] || '' );
	} );
};

function delay( ms ){
	return new Promise( function( resolve, reject ){
		setTimeout( resolve, ms );
	} );
}