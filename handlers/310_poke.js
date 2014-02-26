'use strict';

var responses = [
	  'Ouch'
	, 'Ooh, that tickles'
	, 'Okay, you can stop now'
	, 'Really, you\'re starting to bug me'
	, 'Baaahhh'
	, 'Dabu'
	, 'Lok\'tar'
	, 'Zug Zug'
	, 'Ready for work!'
	, 'I would not do such things if I were you'
	, 'Did somebody call a doctor?'
	, 'Reticulating splines'
	, 'Server fault'
	, '@#$@$!(*@Y$!IU@H$I!@#K!#!'
	, '...'
];

module.exports = function( app ){
	app.addCmd( 'poke', function *( next ){
		this.pokeCtr || ( this.pokeCtr = 0 );

		var resp = responses[ this.pokeCtr++ ];
		if( resp ){
			this.write( resp.cyan );
		}else{
			this.dieMsg = this.username.green + ' kept poking the server, so now the server is shutting down in protest'.cyan;
			yield* this.runCmd( 'die' );
		}
	} );
};