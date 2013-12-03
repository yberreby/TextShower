Presentation
====
[![Release 1.0.0](http://b.repl.ca/v1/Release-1.0.0-yellowgreen.png)](https://github.com/filsmick/TextShower/releases/tag/v1.0.0)

**TextShower** is probably the simplest flexible solution for creating text sliders. You can either create sliders with a plug'n'play solution or customize settings page-to-page.

You need jQuery 1.8 or above for TextShower to work.

Downloads:  
- [Developement (8 Ko)](http://filsmick.github.io/javascripts/TextShower.js)  
- [Minified (4 Ko)](http://filsmick.github.io/javascripts/TextShower.min.js)

How to use
====

There is two ways to use TextShower. One is for those who don't care about animation settings and just want to get the work done, and one is for those who want a fully-customized behavior. Let's start with the simplest.

## The simple solution

Firstly, ensure jQuery is embedded in your page. If it is not

Add the following code to your page:
``` html
<div class="TextShower-box"> 
	<strong class="TextShower-title">Headlines of the text</strong> 
	<p class="TextShower-text">Text you want to be showed after click</p>
</div>
```
And embed TextShower just before closing the `body` tag (*after* jQuery):

``` html
<script src="http://filsmick.github.io/javascripts/TextShower.min.js"></script>
```

Yup, you're done.


## The less simple one

You are no satisfied? You want to have another timing? Another transition? Well, we'll do that.

Do everything like in the "Simple solution", excepted the embed. Don't load the script from GitHub servers. Instead, download TextShower.js or TextShower.min.js (the latter is the lighter), upload it on your FTP server then embed it as previously, but with your own path:  
```html
<script src="/path/to/TextShower.min.js"></script>
```
Now, open the .js file in a text editor and edit the last line of the code:

``` javascript
TextShower('0.8s', '0.3s', 'ease', true);
```

This function is what we want to edit. Here are its arguments:

```
TextShower([height transition duration], [margin transition duration], [timing function], [should add a dynamic '+' to the box title? true/false])
```
Simply replace the default values by what you want, save and you changes will be reflected sitewide.


### Page by page settings

But let's imagine you have a website with two sliders. One is in the documentation and opens a very, very long piece of text. The other is a ridiculously small box of only one line. You may want to change certain settings page by page, the transition timing, in example. It's not really necessary since the transition is good in both cases but assume you really want to change some settings.

In order to do that, you must add a `meta` tag to the pages you want to change settings:

```html
<meta data-TextShower="default 0.3s default linear true" />
```
In this example, you can see almost the same structure as in .js file's function. The differences are that here, you don't need quotes or commas, you can simply put spaces between settings, and you can tell the script to use the default settings (those in the js file, you know) for certain parameters.

And now, your pages have different transitions and everyone is happy.

## And if I want more?

Well, feel free to edit the code. You can easily add features to TextShower to meet your needs because its code is clear, clean and commented.  This is why I said TextShower is *flexible*.

Browsers support
====

TextShower should support everything that jQuery support. Everything should work fine with jQuery 1.8+, even in old IE. If you have jQuery 2.X embedded instead, you will miss all these poor Internet Explorer 8 and lower users.

So if you have any bug in one of these browsers:  

* Firefox 2.0+
* Internet Explorer 6+
* Safari 3+
* Opera 10.6+
* Chrome 8+ 

It is a real issue and should be [reported](https://github.com/filsmick/TextShower/issues/new) along with the error you encountered.

Suggestions or issues
====

TextShower is in an early stage, so you may encounter issues. Please [open an issue](https://github.com/filsmick/TextShower/issues) if that happens or if you have a suggestion.


Credits
====


License
====

Copyright © 2013 Yohaï Berreby

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without limitation the rights to use, copy, modify, merge, publish  
and distribute, and to permit persons to whom the Software is furnished to do so,  
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE. YOU CANNOT SUBLICENSE AND/OR SELL COPIES OF THIS SOFTWARE WITHOUT  
THE EXPRESS PERMISSION TO DO SO.