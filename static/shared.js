
var React = require('react');
var createReactClass = require('create-react-class');

// Note: Must be ./rapid-express-react rather than rapid-express-react because
// browserify/babelify doesn't play nice with JSX in node_modules.  This symlink gets around that.
var Shared = require('./rapid-express-react/static/shared');

var navItemStyle = {
  margin: '8px',
};

var NavButton = createReactClass({
  render: function() {
    var style = Object.assign({}, navItemStyle, {
      fontSize: '20px',
    });

    return (
      <div style={style}>
        <Shared.Link href={this.props.href}>{this.props.title}</Shared.Link>
      </div>
    )
  }
});

var Nav = createReactClass({
  render: function() {
    var navStyle = Object.assign({}, Shared.StyleZDepth1, {
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'baseline',
      marginTop: '14px',
      justifyContent: 'center',
    });

    var navLogoStyle = Object.assign({}, navItemStyle, {
      fontSize: '50px',
    });

    return (
      <div style={navStyle}>
        <div style={navLogoStyle} onClick={this.logoClick}>Fans of Fan's Recipes</div>
      </div>
    )
  }
});

module.exports = Object.assign({},
Shared,
{
  Nav: Nav,
});

