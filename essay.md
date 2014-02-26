### Web Apps, Browsers, Servers, and the HTTP Protocol, OH MY! (A technical history lesson)

Wow, what a mouthful!  You didn't come here to read a history lesson, right?  So how about a little bit of personal history instead?

### (My personal technical history lesson)

That's better.  If you want actual history, you have Wikipedia!  This is much more fun, and it finally gives me a chance to rant about some of the crazier stuff I've done.  Now where to start?  How about the backbone of the web today:

#### XHRs

##### Persistent Connections

XHRs were invented by the Microsoft Outlook Web team, yada yada.  Actually XHRs weren't that game-changing from a technology perspective.  I'd been doing "ajaxy" stuff for several years before anyone came along and gave me ~~Microsoft.XMLHTTP~~, ~~Msxml2.XMLHTTP~~, ~~Msxml3.XMLHTTP~~, `XMLHttpRequest`'s.  How?  Let's start with persistent connections.  I was writing server-side JS back with classic ASP, opening an iframe to `/some/script.asp?param=foo`, and the iframe would then write out:

```html
<script>window.parent.response({ foo: 'bar' });</script>
```

At some point, the idea of dropping closures into a hash with random names dawned on me, and I started passing `?param=foo&cb=fn12412412313`.

I even had "Comet" going via iframes whose content looked like this:

```html
<script>window.parent.sendMsg({ msgFrom: 'Foo', msg: 'Hey!' });</script>
<script>window.parent.sendMsg({ msgFrom: 'Bar', msg: 'Don\'t tell Foo, but I think he is crazy!', private: true });</script>
```

Between each of those script tags, the server would do whatever it did, waiting for new data, checking the database, whatever.  It would then write out a script tag and call `Response.flush()` which would, you guessed it, flush the response to the client.  The result?  AJAX!  What happens if the connection drops?  Well you re-open it, duh.  If the parent hasn't received any data in N seconds, it simply reloads the iframe.  Simple!

##### XML Data Islands

At some point this technological marvel landed in front of my eyes.  I used it for all of 1 project, I think.  It was basically an XHR before XHRs existed.  I forget why I didn't use it more, probably because it was an IE-only tech, or it had some limitations that persistent connections didn't.  I dunno, anyway...

##### Actual XHRs

```
var XHR = createXhr(); // this goes and tries to create one of 4 or 5 different objects, returning the one that works
XHR.open( 'GET', '/foo/bar.asp' );
XHR.onreadystatechange = function( resp ){
	if( resp.readyState !== 4 ){ return; }

	// do stuff with resp.responseText
}
```

[An article I wrote back in 2006 covering XHRs](http://www.htmlgoodies.com/primers/jsp/article.php/3608046/Javascript-Basics-Part-10.htm)

##### jQuery/Prototype XHRs, and now Promises

Yay, no more worrying about the internals!  And I <3 Promises.  For the sake of brevity, let's move on to a new topic.

##### HTML, and other stuff

Okay, just a brief run-down of the various ways to generate HTML:

- straight HTML, with CSS & JS embeded in the page
- XML/XSLT -- Gah, who ever thought this was a good idea?  This was Templating v0.1
- <Pick Your Language> Inline HTML -- Templating v0.2
- Actual Template Languages (currently things like Jade, HAML, Handlebars, EJS, etc)

#### Images

I wonder how many image formats have tried to take hold?  `GIF` & `JPEG` have been around forever, then along came `PNG` & `PNG24`.  I guess you technically have things like `TIFF` and `BMP` that have been around forever too.  Then the ones that "failed" to take hold, like `APNG`, `WebP`, etc.  With the exception of data URIs, images haven't changed much since, well, ever.  People are still ignorant about formats and when you should use which (especially png8 transparency).  But this is boring, so I'm going back to my own projects:

##### ASP Generated Barcode BMPs

Back in 2002 or so, I had a client that wanted barcodes to put on coupons that a user could print.  The only barcode software I could find at the time was next-to-impossible to integrate into a website, so I wrote my own.  I basically wrote a script that generated a `.bmp` file on the fly.  You could link to it and get an image back, e.g.:

```html
<img src="/barcode.asp?code=YourBarCode012345&height=20&width=1&mode=code39">
```

[Version 1](http://www.planet-source-code.com/vb/scripts/ShowCode.asp?txtCodeId=8383&lngWId=4)
[Version 2](http://www.planetsourcecode.com/vb/scripts/ShowCode.asp?txtCodeId=8817&lngWId=4)

At some point I poreted it to JS/Canvas for a different client

##### Live GIFs

For a while, I had a server running "Live" GIFs that I was using as an avatar on whatever forum I frequented at the time.  What is a "Live GIF" you ask?  Well it's an animated GIF with the connection to the server kept open indefinitely.  The server writes out new frames as data changes, and thus the GIF updates.  I never did much with it, but it had:

- A clock
- Update a "currently playing <song x>" part of the gif
- Some other random stuff, I forget

I always thought the concept was interesting, but never found anything that interesting to do with it.

##### GIF Palettes

Yada, Yada you don't care about the client details.  I wrote a script to shift the color palette of a gif via whatever HSL adjustments you wanted.

[Script is here](http://www.planet-source-code.com/vb/scripts/ShowCode.asp?txtCodeId=8626&lngWId=4)

I used it, along with asp generated CSS, to color cycle entire websites.  Want a blue website?  Okay.  Orange?  Here.  Yellow, Teal, Green?  Yep.  Pink?  No.  Just... No.

##### A "Better" PNG24

Okay, PNG24s are awesome.  They have full transparency, can render actual graphics like JPGs, but... they're huge.  WebP is a partial solution for many of the problems, but you can't use it.  So a possible solution is a JPG with a 8-bit PNG Mask with semi-transparency (basically a full 24-bit black/white PNG but way smaller).  There are probably similar solutions out there, but [This is one of mine](https://github.com/zyklus/JpgCanvasMask)

#### JavaScript

Invented by... you have JavaScript & JScript ... Engines ... I wish I could use `feature x` ... Node.JS Rocks!

Canvas is nice, and libraries are better, and yada yada, but it's basically the same language it was 15 years ago, just faster.  I'm sad now.

##### Random JS Projects I worked on

- CSS3 3D Engine
- "Visio" spreadsheet creator
- Animatronic build-a-bear
- 3D LED Cube controller
- Wireless Shimano Di2 Shifters
- Full IDE

#### JavaScript on the server

Yes, I've used PHP, Ruby, .Net, ASP VBS, Python, Cold Fusion, and a few others.  But for me it's always been about JS:

- ASP JS
- Rhino
- Node.js (since <v0.1)

#### HTTP

Has anything changed?  Ever?  Okay, people use PUT & DELETE more, and frameworks allow for better routing.  And there are more headers, that do more security stuff.  But really it all comes down to:

````
telnet www.google.com 80
> GET / HTTP/1.1
> host: www.google.com
>
```

#### Browsers

Meh.  Each new one supports more than the one before it, and hopefully closes a few security holes.  IE sucks, and I feel sorry for anyone that has to support anything below IE8.  IE's original box model _is better_ than the standardized model though.  And a lot of the crap that IE gets crap for not being standards compliant about is stuff they invented, and then the standard went a different way.  So give them some slack ;)

#### Debugging

- console.log( var )
- Firebug
- Chrome Dev Tools
- Various other tools that now integrate with chrome dev tools

#### I'm bored

So I'm going to stop.  This should provide talking points if necessary.

#### Resources

[JS articles I wrote back in 2006](http://www.htmlgoodies.com/primers/jsp/) -- Search for "Javascript Basics Part [1-13]".  It covers pretty much everything that existed in 2006.
[Really old small projects I wrote](http://www.planet-source-code.com/vb/scripts/BrowseCategoryOrSearchResults.asp?lngWId=4&blnAuthorSearch=TRUE&lngAuthorId=8850002407&strAuthorName=Mark%20Kahn&txtMaxNumberOfEntriesPerPage=25)
[Not so old projects](https://github.com/zyklus)
[Random fun widgets](codepen.io/zyklus/)