/*
    A data warehouse mechanism (based on a basic implementation from @stoyanstefanov)

    Example usage:

                    var div = document.getElementById('test');

                    Data.set(div, { yo: 'yo', ma: 'ma', la: 'la' });

                    var testing = Data.get(div);
                    var a = testing.yo;
                    var b = testing.ma;
                    var c = testing.la;

                    console.log(testing, a, b, c);
                    console.log(Data.show());

                    Data.reset();

                    console.log(Data.show());
 */
define(function(){

    var warehouse = {};
    var count = 1;

    return {
        /*
            Set some data onto the specified Element via DOM property rather than via DOM attributes.

            @param dom {Element/Node} the element to set data on
            @param data {Multiple} the data to be set (could be an Array, String, Object anything)
            @return undefined {undefined} no explicit return value
         */
        set: function (dom, data) {
            // Set a DOM property '__data' and give it a unique ID value
            if (!dom.__data) {
                dom.__data = 'uid_' + count++;
            }

            // Store the data in our Warehouse object and assign it to a key whose value is the unique DOM property value
            warehouse[dom.__data] = data;
        },

        /*
            Returns the data associated with the specified Element.

            @param dom {Element/Node} the element to retrieve stored data for
            @return warehouse[dom.__data] {Multiple} the data stored for the element with a DOM property of '__data'
         */
        get: function (dom) {
            return warehouse[dom.__data];
        },

        /*
            Resets the 'warehouse' object so there are no stored pieces of data

            @return undefined {undefined} no explicit return value
         */
        reset: function(){
            count = 1;
            warehouse = {};
        },

        /*
            Returns the 'warehouse' object itself so we can see at a glance its contents

            @return warehouse {Object} the main 'warehouse' object
         */
        show: function(){
            return warehouse;
        }
    };

});