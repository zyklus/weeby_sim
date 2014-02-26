'use strict';

~function(){
	var $input = $( 'input' )
	  ,  $chat = $( '.chat .log' )
	  , socket = io.connect()
	  ,    log = []
	  ,  logIx = 0
	  , symbols = {
		  '\x1B[1m'      : '<b>'
		, '\x1B[3m'      : '<i>'
		, '\x1B[4m'      : '<u>'
		, '\x1B[7m'      : '<span style="background-color:black;color:white;">'
		, '\x1B[9m'      : '<del>'
		, '\x1B[37m'     : '<span style="color:white;">'
		, '\x1B[90m'     : '<span style="color:gray;">'
		, '\x1B[30m'     : '<span style="color:black;">'
		, '\x1B[34m'     : '<span style="color:blue;">'
		, '\x1B[36m'     : '<span style="color:cyan;">'
		, '\x1B[32m'     : '<span style="color:green;">'
		, '\x1B[35m'     : '<span style="color:magenta;">'
		, '\x1B[31m'     : '<span style="color:red;">'
		, '\x1B[33m'     : '<span style="color:yellow;">'
		, '\x1B[47m'     : '<span style="background-color:white;">'
		, '\x1B[49;5;8m' : '<span style="background-color:gray;">'
		, '\x1B[40m'     : '<span style="background-color:black;">'
		, '\x1B[44m'     : '<span style="background-color:blue;">'
		, '\x1B[46m'     : '<span style="background-color:cyan;">'
		, '\x1B[42m'     : '<span style="background-color:green;">'
		, '\x1B[45m'     : '<span style="background-color:magenta;">'
		, '\x1B[41m'     : '<span style="background-color:red;">'
		, '\x1B[43m'     : '<span style="background-color:yellow;">'
		, '\x1B[22m'     : '</b>'
		, '\x1B[23m'     : '</i>'
		, '\x1B[24m'     : '</u>'
		, '\x1B[27m'     : '</span>'
		, '\x1B[29m'     : '</del>'
		, '\x1B[39m'     : '</span>'
		, '\x1B[49m'     : '</span>'
	}
	;

	$input.focus()
		.on( 'blur'    , function(){ $input.focus(); } )

		// keep input focused at all times
		.on( 'keypress', function( ev ){
			if( ev.keyCode === 13 ){
				submit( this.value );
				this.value = '';
			}
		} )

		// basic input history with up/down keys
		.on( 'keydown', function( ev ){
			switch( ev.keyCode ){
				case 38: showLog( --logIx ); break;
				case 40: showLog( ++logIx ); break;
			}
		} );

	function showLog(){
		logIx = Math.max( 0, Math.min( logIx, log.length ) );

		$input.val( log[ logIx ] || '' );
	}

	function submit( val ){
		log.push( val );
		logIx = log.length;

		socket.emit( 'data', val );
	}

	socket.on( 'data', function( data ){
		$chat.append( format( data ) );
		$chat.prop( 'scrollTop', 1000000 );
	} );

	function format( data ){
		data = data.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
		for( var key in symbols ){
			while( ~data.indexOf( key ) ){
				data = data.replace( key, symbols[ key ] );
			}
		}

		return (
			 '<div>'
			+ data.replace( /\n/g, '<br />' )
			+ '</div>'
		);
	}
}();