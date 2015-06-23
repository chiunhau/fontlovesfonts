var data = [ 
	{id: 1, typeface: "Futura"}, 
	{id: 2, typeface: "Courier"}, 
	{id: 3, typeface: "Hiragino"}, 
	{id: 4, typeface: "Arial"}, 
	{id: 5, typeface: "Avenir"}, 
	{id: 6, typeface: "Rockwell"}, 
	{id: 7, typeface: "Courier Neue"}, 
	{id: 8, typeface: "Helvetica"}, 
	{id: 9, typeface: "Trajan"}, 
	{id: 10, typeface: "Glober"}
];

var Container = React.createClass({displayName: "Container",
  render: function() {
  	return (
			React.createElement("div", {className: "container"}, 
				React.createElement(FontBox, null), 
				React.createElement(FontBar, {data: this.props.data})
			)
  	);
  }
});

var FontBox = React.createClass({displayName: "FontBox",
  render: function() {
	  return (
			React.createElement("div", {className: "font-box"}, 
				React.createElement(FontSquareLeft, null), 
				React.createElement(FontSquareRight, null)
			)
  	);
     
  }
});

var FontSquareLeft = React.createClass({displayName: "FontSquareLeft",
  render: function() {
  	return (
			React.createElement("div", {className: "square square-left"}, 
				"呦"
			)
  	);
  }
});

var FontSquareRight = React.createClass({displayName: "FontSquareRight",
  render: function() {
  	return (
			React.createElement("div", {className: "square square-right"}, 
				"嘿"
			)
  	);
  }
});

var FontBar = React.createClass({displayName: "FontBar",
  render: function() {
    return (
    	React.createElement("div", {className: "font-bar"}, 
	    	React.createElement(ArrowLeft, null), 
	    	React.createElement(FontsList, {data: this.props.data}), 
	    	React.createElement(BarMask, null), 
	    	React.createElement(ArrowRight, null)
	    )
    );
  }
});

var ArrowLeft = React.createClass({displayName: "ArrowLeft",
  render: function() {
    return (
    	React.createElement("div", {className: "arrow-left"})
  	);
  }
});

var ArrowRight = React.createClass({displayName: "ArrowRight",
  render: function() {
    return (
    	React.createElement("div", {className: "arrow-right"})
  	);
  }
});

var BarMask = React.createClass({displayName: "BarMask",
  render: function() {
  	return (
  		React.createElement("div", {className: "bar-mask"})
  	);
     
  }
});

var FontsList = React.createClass({displayName: "FontsList",
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			React.createElement(Font, {typeface: font.typeface, id: font.id}
  			)
  		);
  	});
  	return (
  		React.createElement("div", {className: "font-list"}, 
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
    		this.props.id
    	)
    );
  }
});

React.render(
	React.createElement(Container, {data: data}),
	document.getElementById("content")
);