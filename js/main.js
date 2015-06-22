var data = [ {typeface: "Futura"}, {typeface: "Courier"}, {typeface: "Hiragino"}, {typeface: "Arial"}, {typeface: "Avenir"}, {typeface: "Rockwell"} ];

var FontsList = React.createClass({displayName: "FontsList",
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			React.createElement(Font, {typeface: font.typeface}
  			)
  		);
  	});
  	return (
  		React.createElement("div", {className: "fontList"}, 
  			React.createElement("ul", null, 
  				fontNodes
  			)
  		)
  	);
  }
});

var Font = React.createClass({displayName: "Font",
	handleClick: function() {
		this.setState({
			isSelected: true
		})	
	},
  render: function() {
    return (
    	React.createElement("li", {className: "font", id: this.props.typeface, onClick: this.handleClick}, 
    		"嘿"
    	)
    );
  }
});

React.render(
	React.createElement(FontsList, {data: data}),
	document.getElementById("content")
);