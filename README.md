Presentation
======

Tired of the heavy jQuery scripts for everything ? Don't want to overload your server and the client with
tons of useless code for just a text slider ? TextShower is made for you !

<a href="http://filsmick.github.io/TextShower/">Presentation, instructions and examples</a>

How to use
======

Download the script and embed it **at the end** of your page. Then go to your FTP and customise values by changing the
arguments of the function at the end of the code. First is text transition duration, second is margin transition
duration, third is text transition timing function, fourth is margin transition timing function, fifth is a boolean
that means "are the textboxes animated or not at page load" and sixth is also a boolean that means "should we add a
dynamic '+' sign to the box title".
Default values are respectively 0.8s, 0.3s, ease, linear, false and true.

After that, insert this piece of code anywhere in your page : 

``` html
<div class="TextShower-box"> 
	<strong class="TextShower-title">Headlines of the text</strong> 
	<p class="TextShower-text">Text you want to be showed after click</p>
</div>
```

Note that you can use any HTML tag for any element, but these are the most suitable.
You can embed as many TextShower boxes as you want in your page. You can also add as many classes as you want
to the elements.
