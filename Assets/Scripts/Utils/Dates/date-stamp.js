define(function(){

    /*
        The function can create a brand new date, or it can start with any input date that’s supported by 
        JavaScript’s Date() constructor. Examples of supported formats are Unix timestamps, ISO datestamps, 
        and existing Date objects.

        Note that partial dates such as "1991-08-06" should be avoided, because browsers vary in what they’ll 
        assume the time to be.

        If the input isn’t valid, then the function returns null. Otherwise, a Date object is created and 
        formatted using various UTC-specific methods, such as getUTCFullYear() and getUTCDate(). You can 
        see how the tokens array initially stores a set of references to these functions, and the iterative 
        code uses those references to create each method name, like Minutes for getUTCMinutes(); the method 
        is called, then the value it returns overwrites the original reference.

        The definition for Month also specifies a numeric increment – ["Month", 1] rather than simply ["Month"]. 
        This is because the getUTCMonth() method returns numbers between 0 and 11, whereas months in the 
        ISO format must be from 1 to 12 (or rather, from "01" to "12").

        Keeping the tokens in arrays isn’t specifically necessary, it’s just very handy. Doing so means we can 
        keep the code size down by building method calls on the fly, and then compile the bulk of the datestamp 
        with just a couple of join() calls.

        When it comes time to actually display dates and times in the user’s browser, convert them to a friendlier 
        local format. JavaScript is particularly handy for this because it evaluates on the client, using their clock. 
        So, any timestamp passed through the Date() constructor is automatically converted to the user’s locale 
        (unless you use the getUTC methods, as we do in this function).

        The ISO 8601 format is arguably the most useful format for storing dates. But, it does have one slight drawback, 
        in the fact that some older browsers don’t support it as the input to the Date() constructor. These browsers 
        include Safari 3 and Internet Explorer 8 or earlier. So, for look at time-stamp.js for a reciprocal function that 
        parses ISO datestamps to produce a Unix timestamp – something that even IE6 can understand!

        Example usage:
            datestamp();
            datestamp(1333880482000);
            datestamp("Mon, 07 Feb 2000 09:22:04 GMT");
            datestamp("Sun, 06 Feb 2000 23:22:04 +10:00");
            datestamp("1973-05-29T03:03:45Z");
            datestamp(new Date(1349646120000));

            Taking a UTC datestamp in the ISO format, and converting it to a human-friendly and locale-specific date:
                new Date(datestamp()).toString();

        Source:
            http://jspro.com/raw-javascript/creating-an-iso-datestamp/
     */

    var datestamp = function (date) {
        if (isNaN((date = typeof(date) !== 'undefined' ? new Date(date) : new Date()).getTime())) {
            return null;
        }

        var pad = function (n) {
            return (n < 10 ? '0' : '') + n;
        };

        var tokens = [[['FullYear'], ['Month', 1], ['Date']], [['Hours'], ['Minutes'], ['Seconds']]];

        for (var a = tokens.length, i = 0; i < a; i ++) {
            for (var b = tokens[i].length, j = 0; j < b; j ++) {
               tokens[i][j] = pad(date['getUTC' + tokens[i][j][0]]() + (tokens[i][j][1] || 0));
            }
        }

        return tokens[0].join('-') + 'T' + tokens[1].join(':') + 'Z';
    }

    return datestamp;

});