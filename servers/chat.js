'use strict';

var events = require( 'events' )

  , reqAll = require( 'require-all' )
  , colors = require( 'colors' )
  ,     co = require( 'co' )

  , server = {
  	  users : {}
  	, rooms : {}
  }
  , handlers = []
  ;


var app = {
	addHandler : function( handler      ){ handlers.push( handler );                    }
	,   addCmd : function( cmd, handler ){ handlers.push( cmdHandler( cmd, handler ) ); }
};


// include all handlers and pass them each the app object
// so that they can each do whatever they want
~function( obj ){
	Object.keys( obj ).forEach( function( key ){
		obj[ key ]( app );
	} );
}( reqAll( __dirname + '/../handlers' ) );


// ensure that a message ends in a newline
function newline( fn ){
	return function( msg ){
		fn( msg + ( ( msg[ msg.length - 1 ] === '\n' ) ? '' : '\n' ) );
	}
}

function ChatClient( socket ){
	this.socket = socket;
	this.foo = Math.random();

	socket.on( 'data' , this.onData .bind( this ) );
	socket.on( 'end'  , this.onEnd  .bind( this ) );
	socket.on( 'error', this.onError.bind( this ) );

	this.write( 'Welcome to the XYZ chat server'.cyan, true );

	this.runHandlers();
};

function cmdHandler( cmd, handler ){
	handlers[ cmd ] = handler;

	return function *( next ){
		if( cmd !== this.cmd ){ return yield next; }

		yield handler;
	};
}

ChatClient.prototype = {
	// live dangerously, expose the server everwhere!  MUAH HAHA
	  server : server
	, buffer : ''

	, onData : function onData( data ){
		data = data.toString()
			.replace( /^\s+|\s+$/g, '' )       // trim whitespace
			.replace( /[\u00FF-\uFFFC]/g, '' ) // strip unicode up to replacement char
			;

		// ignore blank data
		if( !data ){ return; }

		this.runHandlers( data );
	}

	, onEnd : co( function *onEnd(){
		yield this.runCmd( 'quit' );
	} )

	// shamelessly ignore errors!
	, onError : function onError( err ){}

	, runHandlers : function runHandlers( data ){
		data || ( data = '' );

		var       ix = 0

		//                 (cmd)      ( args  )
		  , cmdParts = /^\/(\w+)(?:\s+([\s\S]+))?$/.exec( data + '' ) || ''
		  ,     self = this
		  ,  context = {
		  	__proto__ : this
		  	,    data : data + ''
		  	,     cmd : cmdParts[1] || ''
		  	, cmdData : cmdParts[2] || ''
		  }
		  ;

		function next(){
			try{
				if( ix < handlers.length ){
					co( handlers[ ix++ ] ).call( context, next, self.postCmdProcessor( context, true ) /* done handler */ );
				}
			}catch( err ){
				console.error( 'ERROR: ', err );

				try{
					self.write( '<ERROR> Sorry, an unknown server error has occurred' );
				}catch( err ){}
			}
		};

		next();
	}

	// Copies temp data from context --> this
	// flushes response buffer
	, postCmdProcessor : function postCmdProcessor( context, flushBuffer ){
		var self = this;

		return function( err, result ){
			if( err ){
				console.log( err.message.red + '\n', err.stack );
				throw err;
			}

			for( var n in context ){
				if( !context.hasOwnProperty( n ) || ~' data cmd cmdData buffer '.indexOf( ' ' + n + ' ' ) ){ continue; }

				self[ n ] = context[ n ] ;
			}

			if( context.buffer ){
				self.write( context.buffer, flushBuffer );
			}
		}
	}

	, runCmd : function *cmd( cmd, params ){
		if( !handlers[ cmd ] ){
			console.error( 'Invalid command:', cmd );
			return;
		}

		var self = {
			__proto__ : this
			,    data : cmd + ' ' + params
			,     cmd : cmd
			, cmdData : params
		};

		co( handlers[ cmd ] ).call(
			  self
			, function(){}                  /* next */
			, this.postCmdProcessor( self ) /* done */
		);
	}

	, sendMsg : function sendMsg( destination, msg ){
		if( typeof destination === 'string' ){
			destination = ( server.rooms[ destination ] || [] ).map( function( user ){ return server.users[ user ]; } );
		}else if( destination instanceof ChatClient ){
			destination = [ destination ];
		}

		// don't know what to do with this!
		if( !( destination || [] ).length ){
			return;
		}

		for( var i=0, l=destination.length; i<l; i++ ){
			destination[ i ].write( msg, true );
		}
	}

	, end : function end( msg ){
		if( msg ){ this.write( msg + '\n', true ); }

		if( this.socket.end ){ this.socket.end(); }

		process.nextTick( this.socket.removeAllListeners.bind( this.socket ) );
	}

	, write : function write( msg, immediate ){
		if( this.hasOwnProperty( 'write' ) ){ immediate = true; }

		msg += ( ( msg.substr( msg.length - 1 ) !== '\n' ) ? '\n' : '' );

		if( immediate ){
			this.socket.write( msg );
			this.buffer = '';
		}else{
			this.buffer = ( this.buffer || '' ) + msg;
		}
	}
};

module.exports = function( socket ){
	new ChatClient( socket );
};