'use strict';

if( 'function' !== typeof Map ){
	console.log( 'node run without ES6 support.  Please enable by using the --harmony flag.\n' );
	process.end();
}

// startup servers
require( './servers' );

/**
 * Magically handle HTTP & Telnet on the same port.
 * Never use this in production.  Never, ever ever.
 * Just messing around here ;)
 **/

var     net = require( 'net' )
  , servers = { telnet: 9501, http: 9502 }
  ;

net.createServer( function( socket ){
	var incoming = []
	  , proxy
	  ;

	function handOff( server ){
		if( proxy ){ return; }

		proxy = new net.Socket();
		proxy.connect( server );

		socket.on( 'data', proxy .write.bind( proxy  ) );
		socket.on( 'end' , proxy .end  .bind( proxy  ) );
		proxy .on( 'data', socket.write.bind( socket ) );
		proxy .on( 'end' , socket.end  .bind( socket ) );

		// re-emit incoming data
		incoming.forEach( function( data ){
			socket.emit( 'data', data );
		} );
		incoming = [];
	}

	socket.on( 'data', function( data ){
		if( proxy ){ return; }

		var start = data.toString().substr( 0, 10 );
		incoming.push( data );

		// see if the connection is opened with a valid HTTP Verb
		[ 'GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'TRACE', 'CONNECT' ].forEach( function( verb ){
			if( !start.indexOf( verb ) ){
				handOff( servers.http );
			}
		} );
	} );

	setTimeout( function(){
		// no valid data received, hand off to telnet
		handOff( servers.telnet );
	}, 1000 );
} ).listen( 9399 );

process.on( 'uncaughtException', function( err ){
    console.error( 'Uncaught Error:', err );
} );