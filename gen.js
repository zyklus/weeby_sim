var co = require( 'co' );

function *foo( a, b, c ){
	yield* bar( a, b, c );
}

function *bar(){
	for( var i=0, l=arguments.length; i<l; i++ ){
		yield show( arguments[i] );
	}
}

function *show( a ){
	console.log( a );
}

co( foo )( 1, 2, 3, function( err, val ){ console.log( arguments ); } );