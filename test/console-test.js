var tape = require("@redsift/tape-reel")("<div id='test'></div>"),
    svg = require("@redsift/d3-rs-svg"),
    d3 = require("d3-selection"),
    text = require("../");


tape("text() generates and updates text", function(t) {
    var host = svg.html();
    var el = d3.select('#test').call(host).select(host.self()).select(host.child());

    var elm = text.svg().lineHeight(20);
    el.datum( [ { text: 'first' }, { text: 'second'.split('') }, 'last' ] ).call(elm);
    t.equal(el.select(elm.self()).selectAll('text').size(), 3);
    
    el.datum( [ 'first', 'second', 'third', 'last' ] ).call(elm);    
    t.equal(el.select(elm.self()).selectAll('text').size(), 4);    

    el.datum( [ 'only' ] ).call(elm);    
    t.equal(el.select(elm.self()).selectAll('text').size(), 1);    

    el.datum( [ ] ).call(elm);    
    t.equal(el.select(elm.self()).selectAll('text').size(), 0);    
    
    t.end();
});   
