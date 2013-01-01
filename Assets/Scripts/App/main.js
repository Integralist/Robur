require.config({ 
	paths: {
		async: "../Plugins/async"
	}
});

require(['../Utils/Dates/date-stamp', '../Utils/Dates/time-stamp'], function (datestamp, timestamp) {
    console.log('datestamp()\n\t', datestamp());
    console.log('datestamp(1333880482000)\n\t', datestamp(1333880482000));
    console.log('datestamp("Mon, 07 Feb 2000 09:22:04 GMT")\n\t', datestamp("Mon, 07 Feb 2000 09:22:04 GMT"));
    console.log('datestamp("Sun, 06 Feb 2000 23:22:04 +10:00")\n\t', datestamp("Sun, 06 Feb 2000 23:22:04 +10:00"));
    console.log('datestamp("1973-05-29T03:03:45Z")\n\t', datestamp("1973-05-29T03:03:45Z"));
    console.log('datestamp(new Date(1349646120000))\n\t', datestamp(new Date(1349646120000)));
    console.log('Convert datestamp() to a String', new Date(datestamp()).toString());

    // Work around for older browsers (Safari 3 and IE <= 8)
    console.log('new Date(timestamp(datestamp()))', new Date(timestamp(datestamp())));
});