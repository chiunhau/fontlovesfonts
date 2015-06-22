var data = [ {typeface: "Futura"}, {typeface: "Courier"} ];

var FontsList = React.createClass({displayName: "FontsList",
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			React.createElement(Font, null
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
  render: function() {
    return (
    	React.createElement("li", {className: "font"}, 
    		"嘿"
    	)
    );
  }
});

React.render(
	React.createElement(FontsList, {data: data}),
	document.getElementById("content")
);