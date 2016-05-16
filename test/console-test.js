var tape = require("@redsift/tape-reel")("<div id='test'></div>"),
    svg = require("@redsift/d3-rs-svg"),
    d3 = require("d3-selection"),
    console = require("../");


tape("console() generates frame, menu, clip", function(t) {
    var host = svg.html();
    var el = d3.select('#test').call(host).select(host.self()).select(host.child());

    var elm = console.svg();
    el.datum( 'Unit Test' ).call(elm);
    t.equal(el.select(elm.self()).selectAll('rect').size(), 3);
    
    t.end();
});   
