'use strict';

module.exports = function( app ){
	app.addCmd( 'help', function *( next ){
		this.write( [ 'Available Commands: ' ].concat( [
			  '  /quit'
			, '  /rooms                   (list available rooms)'
			, '  /join    <room>'
			, '  /leave                   (leave current room)'
			, '  /msg     <user> <message>'
			, '  /reply   <message>'
			, '  /whereis <user>'
			, '  /follow  <user>          (go to whatever room user is in)'
			, '  /time'
			, '  /echo    <command>       ("says" the result of the command, e.g. /echo /rooms)'
			, '  /delay   <sec> <command> (e.g. /delay 10 /time)'
			, '  /kick    <user> <reason>'
			, '  /die                     (this takes down the server.  Do not do this)'
			, '  /format                  (this command formats YOUR hard drive.  DO NOT RUN)'
			, '  /poke                    (poke the server.  Careful)'

		].sort(
			// who said help has to be as helpful as possible?  Shuffle the commands
			function(){
				return Math.random-0.5;
			}
		) ).join( '\n' ).cyan );
	} );
};