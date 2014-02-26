'use strict';

// CTRL+C
var interrupt = 'FFFD FFFD FFFD FFFD 06'.split( ' ' ).map( function( v ){ return String.fromCharCode( parseInt( v, 16 ) ); } ).join( '' );

module.exports = function( app ){
	app.addHandler( function *( next ){
		if( this.data !== interrupt ){ return yield next; }

		yield* this.runCmd( 'quit' );
	} );
};