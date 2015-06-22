var FontsList = React.createClass({displayName: "FontsList",
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

React.render(React.createElement(FontsList, null), document.getElementById("content"));