'use strict';

module.exports = function( app ){
	app.addHandler( function *( next ){
		if( this.username ){ return yield next; }

		if( this.data ){
			if( this.server.users[ this.data ] ){
				this.write( 'Sorry, name taken.'.red );
			}else if( /\W/i.test( this.data ) ){
				this.write( 'Invalid Username.'.red );
			}else{
				this.username = this.data;
				this.server.users[ this.data ] = this.__proto__;
				this.write( 'Welcome '.cyan + this.username.green + '!'.cyan );
			}
		}

		if( !this.username ){
			this.write( 'Login Name?'.cyan );
		}
	} );
};