'use strict';

var    koa = require( 'koa' )
  ,    app = koa()
  ;

require( 'render-static' )( app );
require( 'render-jade'   )( app );
require( 'render-styl'   )( app );

var server = require( 'http' ).Server( app.callback() )
  ,     io = require( 'socket.io' ).listen( server, { log: false } )
  ,   chat = require( './chat' )
  ;


io.on( 'connection', function( socket ){
	// normalize the socket API
	socket.write = socket.emit.bind( socket, 'data' );
	socket.on( 'disconnect', socket.$emit.bind( socket, 'end' ) );

	chat( socket );
} );

server.listen( 9502 );