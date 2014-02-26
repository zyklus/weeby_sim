'use strict';

module.exports = function( app ){
	app.addCmd( 'rooms', function *( next ){
		var self = this;

		if( !Object.keys( this.server.rooms ).length ){
			return this.write( ' ** No active rooms'.red );
		}

		this.write( [ 'Active rooms are:'.cyan ].concat( Object.keys( this.server.rooms ).map( function( room ){
			return ' * '.cyan + room.green.underline + ( ' (' + self.server.rooms[ room ].length + ')' ).cyan;
		} ) ).concat( 'end of list.'.cyan ).join( '\n' ) );
	} );
};