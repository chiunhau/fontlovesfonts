var FontsBar = React.createClass({displayName: "FontsBar",
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			React.createElement(Font, {typeface: font.typeface}, 
  				"嘿"
  			)
  		);
  	});
  	return (
  		React.createElement("div", {className: "bar"}, 
  			fontNodes
  		)
  	);
  }
});