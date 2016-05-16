import { select } from 'd3-selection';

var menuHeight = 22, 
    radius = 6, 
    menuRadius = 6,
    colorFrameStart = '#F6F6F6',
    colorFrameEnd = '#D4D4D4';
    
export default function console(id) {

 var frameWidth = 300, 
      frameHeight = 200,
      x = 0,
      y = 0,
      classed = 'console',
      appearance = 'blue',
      fill = 'none',
      dotStroke = 'rgba(111, 111, 113, 0.5)',
      frameStroke = 'rgba(177, 177, 177, 0.5)',
      fontSize = '13px',
      fontFamily = '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
      iter = 0;
  
  function _validateTheme(t) {
    if (t !== 'blue' && t !== 'graphite') throw new Error('Unknown appearance=' + t);
  }
  
  function _impl(context) {
    var selection = context.selection ? context.selection() : context,
        transition = (context.selection !== undefined);
    
    selection.each(function(data) {
      iter = iter + 1;
      
      var parent = select(this);
      var el = parent.select(_impl.self());
      if (el.empty()) {
        el = parent.append('g').attr('id', _impl.id());
      }
      el.attr('class', classed);
      
      var defs = el.selectAll('defs').data([ 0 ]);
      var newDefs = defs.enter().append('defs');
      
      // constant
      var grad = newDefs
        .append('linearGradient')
        .attr('id', 'menu-linear-' + id)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
      grad.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', colorFrameStart);
      grad.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', colorFrameEnd);

      // function of settings
      newDefs
        .append('clipPath')
        .append('rect');
      
      var clipPath = el.select('clipPath').attr('id', 'frame-clip-' + id + '-' + iter);
      
      var clipRect = clipPath.select('rect');
      clipRect.attr('rx', menuRadius-0.5); // fudge factor to clean up the compositing
      
      var bg = el.selectAll('rect.background').data([ 0 ]);
      bg = bg.enter().append('rect')
        .attr('class', 'background')
        .merge(bg);
      bg
        .attr('rx', menuRadius)
        .attr('stroke-width', '1.0px')
        .attr('fill', fill) 
        .attr('stroke', frameStroke);
      
      var menu = el.selectAll('rect.menu').data([ 0 ]);
      menu = menu.enter().append('rect')
        .attr('class', 'menu')
        .merge(menu);

      menu
        .attr('height', menuHeight)
        .attr('fill', 'url(#menu-linear-' + id + ')')
        .attr('clip-path', 'url(#frame-clip-' + id + '-' + iter + ')');
      
      var txt = el.selectAll('text').data([ data ]);
      txt = txt.enter().append('text').merge(txt);
      txt
        .attr('y', menuHeight/2)
        .attr('height', menuHeight)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', fontSize)
        .attr('font-family', fontFamily);
      
      var dots = el.selectAll('circle').data([0, 1, 2]);
      dots = dots.enter().append('circle').merge(dots);
      dots
        .attr('cx', (d) => (d + 1) * menuHeight/2 + (d * menuHeight/2.5))
        .attr('cy', menuHeight/2)
        .attr('r', radius)
        .attr('stroke', dotStroke)
        .attr('stroke-width', '0.5px');
      
      if (transition === true) {
        el = el.transition(context);
        txt = txt.transition(context);
        menu = menu.transition(context);
        bg = bg.transition(context);
        dots = dots.transition(context);
        clipRect = clipRect.transition(context);
      }
      
      el.attr('transform', 'translate(' + x + ', ' + y + ')');
            
      clipRect.attr('width', frameWidth)
          .attr('height', frameHeight); // fudge factor to clean up the compositing
      
      bg
        .attr('width', frameWidth)
        .attr('height', frameHeight);
      
      menu
        .attr('width', frameWidth);

      txt
        .attr('x', frameWidth/2)
        .attr('width', frameWidth)
        .text((d) => d);
      
      dots
        .attr('fill', function (d) {
          if (appearance === 'blue') {
            if (d === 0) {
              return '#FB4746';
            } else if (d === 1) {
              return '#FDB425';
            } else {
              return '#29C332';
            }
          }
          return '#8E8E93';
        });      
   });
  }
  
  _impl.self = function() { return 'g' + (id ?  '#' + id : '.' + classed); }
  
  _impl.id = function() {
    return id;
  };
  
  _impl.width = function(value) {
    return arguments.length ? (frameWidth = value, _impl) : frameWidth;
  };

  _impl.height = function(value) {
    return arguments.length ? (frameHeight = value, _impl) : frameHeight;
  };
  
  _impl.x = function(value) {
    return arguments.length ? (x = value, _impl) : x;
  };
  
  _impl.y = function(value) {
    return arguments.length ? (y = value, _impl) : y;
  };  
  
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
  };
  
  _impl.appearance = function(value) {
    if (!arguments.length) return appearance;
    _validateTheme(value);
    appearance = value;
    return _impl;
  };
  
  return _impl;
}
