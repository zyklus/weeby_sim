'use strict';

var  net = require( 'net' )
  , chat = require( './chat' )
  ;

net.createServer( chat ).listen( 9501 );