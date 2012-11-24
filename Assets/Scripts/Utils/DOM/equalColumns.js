define(function(){

    /*
        EXAMPLE USAGE:
        
        columns('>=', 650, '.island.compare', '.island.lending');
     */

    var doc = document;
    
    function compare (element1, element2) {
	    var item1 = doc.querySelector(element1);
        var item2 = doc.querySelector(element2);
        var highest = Math.max(item1.clientHeight, item2.clientHeight);

        item1.style.height = highest + 'px';
        item2.style.height = highest + 'px';
    }
    
    return function (direction, dimension, element1, element2) {
    	if (direction === '>=') {
		    if (doc.documentElement.clientWidth >= dimension) {
		        compare(element1, element2);
		    }
	    } else if (direction === '<=') {
		    if (doc.documentElement.clientWidth <= dimension) {
		        compare(element1, element2);
		    }
	    }
    }

});