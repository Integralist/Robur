<script>
    // Because Google Analytics is loaded asynchronously it's OK to insert it at the top of the page
    // All other JavaScript should be loaded at the bottom of the page though.
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
    _gaq.push(['_trackPageview']);
    _gaq.push(['_trackPageLoadTime']);
    
    (function(){
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    }());
</script>