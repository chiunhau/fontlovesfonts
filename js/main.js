var data = [ {id: 1, typeface: "Futura"}, {id: 2, typeface: "Courier"}, {id: 3, typeface: "Hiragino"}, {id: 4, typeface: "Arial"}, {id: 5, typeface: "Avenir"}, {id: 6, typeface: "Rockwell"} ];

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