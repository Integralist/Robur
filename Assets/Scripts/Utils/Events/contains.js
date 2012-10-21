/*
    Example usage: 
                    var element = document.getElementById('test');

                    element.addEventListener('mouseover', function (event) {
                        // The `relatedTarget` points to the element that the pointer is entering from for `mouseover` events, 
                        // and the element that the pointer is exiting to for `mouseout` events.
                        var target = event.relatedTarget;
                        
                        if (target != this && !contains(target, this)) {
                            // Ensure that the `relatedTarget` is not a descendant of the parent element 
                            // and prevent `mouseover` from firing whenever the pointer moves within the parent.
                            console.log('Mouse entered the parent element.');
                        }

                        console.warn('Mouse entered an element?');
                    });

                    element.addEventListener('mouseout', function (event) {
                        var target = event.relatedTarget;

                        if (target != this && !contains(target, this)) {
                            console.log('Mouse exited the parent element.);
                        }

                        console.warn('Mouse exited an element?');
                    });
 */
define(function(){

    return function (element, ancestor) {
        var descendants, index, descendant;
        
        /*
            `compareDocumentPosition` returns a bitmask that describes the relationship between the two elements. 
            `16` means "is contained by."
         */
        if ("compareDocumentPosition" in ancestor) {
            return !!(ancestor.compareDocumentPosition(element) & 16);
        } else if ('contains' in ancestor) {
            // `contains` is a Micosoft-specific property implemented in most browsers.
            return ancestor != element && ancestor.contains(element);
        } else {
            for (descendants = ancestor.getElementsByTagName('*'), index = 0; descendant = descendants[index++];) {
                if (descendant == element) {
                    return true;
                }
            }
        
            return false;
        }
    }

});