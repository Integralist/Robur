define(function(){

    /*
        The timestamp() function takes an ISO 8601 datestamp, such as "2012-12-06T04:19:27+00:00", and converts it 
        to a Unix timestamp – the number of milliseconds since the UTC epoch, which in this example would be 1354767567000. 
        The timestamp integer is exactly the same as that produced by the Date.getTime() method, and in most modern 
        browsers we can get from one to the other like this:

        new Date("2012-12-06T04:19:27+00:00").getTime();

        However that’s not supported by some older browsers – most significantly IE8 or earlier, but also Safari 3. 
        The timestamp() function fills that gap, by providing intermediate conversion that works in older browsers. 
        Whenever you need to parse an ISO datestamp as a Date, you simply pass it through the timestamp() function first, 
        as shown below:

        new Date(timestamp("2012-12-06T04:19:27+00:00"));

        The timestamp() function takes advantage of the static Date.UTC() method, which takes a set of numeric date 
        components as its input, like this:

        Date.UTC(2012, 11, 6, 4, 19, 27);

        In essence, all we have to do is split the datestamp into those components, then pass them all to Date.UTC(), 
        and we’ll get a Unix timestamp. However, it’s not quite as simple as that!

        To begin with, the datestamp is validated using a simple regular expression. It could have been more precise, 
        but simpler expressions are cheaper to parse, and we can usually assume that the input format will either be 
        exactly correct, or not an ISO datestamp at all. Nonetheless, if you do pass a datestamp with wildly inaccurate values, 
        the browser will still handle them with aplomb. For example, if you specify a date of "2012-26-00" it wil be treated as 
        the 31st of January, 2014 – adding a year and two months for the month "26", and then subtracting a day for the date "00".

        If the datestamp fails validation then the timestamp() function returns null. Otherwise, it proceeds to split the 
        datestamp into its component integers. This is done using string replace with a callback, which is a powerful way 
        of parsing strings. The callback function is passed a set of arguments that correspond with the regex matches – one 
        for the overall match, and then one for each of the backreferences. Within the callback, we parse those values to 
        integers, and save them to an array. For month values, we also have to reduce the value by one, because JavaScript 
        month numbers range from 0 to 11, where our input is "01" to "12".

        Next, we parse the timezone-designator, which could be "Z" for a UTC datestamp, or it could be an offset like "+10:00" 
        or "-0600". The offset is converted to an integer in seconds, and then converted again to positive or negative milliseconds, 
        depending on which way the offset goes.

        Finally, we pass the component integers to Date.UTC(), then add the timezone offset to the value that returns. The UTC() 
        method assumes that its input components are already UTC format, so we have to add the timezone offset to compensate the value. 
        apply() is used to call the UTC() method, because it allows the components array to be passed as a single argument.

        Source:
            http://jspro.com/raw-javascript/parsing-an-iso-datestamp/
     */

    var timestamp = function (datestamp) {
        var pattern = /^([\d]{4})\-([\d]{2})\-([\d]{2})T([\d]{2}):([\d]{2}):([\d]{2})(Z|(?:[+\-][\d]{2}[:]?[\d]{2}))$/;
        
        if (!pattern.test(datestamp)) {
            return null;
        }

        var components = [];
        var zoneoffset = 0;

        datestamp.replace(pattern, function (a,y,m,d,h,i,s,z) {
            for (var bits = [y,m,d,h,i,s], i = 0; i < 6; i ++) {
              components[i] = parseInt(bits[i], 10);
            }
            
            components[1]--;
            
            if(z !== 'Z') {
                zoneoffset = (
                    (
                        (parseInt((z = z.replace(':', '')).substr(1,2), 10) * 3600)
                        +
                        (parseInt(z.substr(3,4), 10) * 60)
                    )
                    *
                    (z.charAt(0) == '-' ? 1000 : -1000)
                );
            }
        });

        return Date.UTC.apply(Date, components) + zoneoffset;
    }

    return timestamp;

});