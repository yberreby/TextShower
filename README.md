Presentation
======

Tired of the heavy jQuery scripts for everything ? Don't want to overload your server and the client with
tons of useless code for just a text slider ? TextShower is made for you !

<a href="https://rawgithub.com/filsmick/TextShower/master/HTML%20Example.html">Example</a>

How to use
======

Download the script and embed it **at the end** of your page. Then go to your FTP and customise values by changing the
arguments of the function at the end of the code. First is text transition duration, second is margin
transition duration, third is text transition timing function and fourth is margin transition timing
function. Default values are respectively 0.8s, 0.3s, ease and linear.

After that, insert this piece of code anywhere in your page : 

	<div class="TextShower-box"> 
		<strong class="TextShower-title">Headlines of the text</strong> 
		<p class="TextShower-text">Text you want to be showed after click</p>
	</div>

Note that you can use any HTML tag for any element, but these are the most suitable.
You can embed as many TextShower boxes as you want in your page. You can also add as many classes as you want
to the elements.
