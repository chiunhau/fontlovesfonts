var data = [ 
	{id: 1, typeface: "futura"}, 
	{id: 2, typeface: "courier"}, 
	{id: 3, typeface: "verdana"}, 
	{id: 4, typeface: "arial"}, 
	{id: 5, typeface: "avenir"}, 
	{id: 6, typeface: "rockwell"}, 
	{id: 7, typeface: "impact"}, 
	{id: 8, typeface: "helvetica"}, 
	{id: 9, typeface: "Lucida Console"}, 
	{id: 10, typeface: "georgia"}
];

var typefaceLeft = { id: 1, typeface: "futura" };
var typefaceRight = { id: 2, typeface: "courier" };
var indicator = { active: "left"};

var Container = React.createClass({displayName: "Container",
	getInitialState: function() {
		return {typefaceLeft: {id: 1, typeface: "futura"}, typefaceRight: {id: 2, typeface: "courier"}}
	},
	setTypefaceLeft: function(id, typeface) {
		this.setState({typefaceLeft: {id: id, typeface: typeface}});
	},
	setTypefaceRight: function(id) {
		this.setState({typefaceRight: {id: id, typeface: "Courier"}});
	},
	setActive: function(side) {
    console.log(side);
		this.setState({indicator: {active: side}});
	},

  render: function() {
  	return (
			React.createElement("div", {className: "container"}, 
				React.createElement(FontBox, {typefaceLeft: this.state.typefaceLeft, typefaceRight: this.state.typefaceRight, indicator: this.state.indicator, setActive: this.setActive}), 
				React.createElement(FontBar, {data: this.props.data, setTypefaceLeft: this.setTypefaceLeft})
			)
  	);
  }
});

var FontBox = React.createClass({displayName: "FontBox",
  render: function() {
	  return (
			React.createElement("div", {className: "font-box", "data-side": this.props.indicator.active}, 
				React.createElement(FontSquareLeft, {typeface: this.props.typefaceLeft, setActive: this.props.setActive}), 
				React.createElement(FontSquareRight, {typeface: this.props.typefaceRight, setActive: this.props.setActive})
			)
  	);
     
  }
});

var FontSquareLeft = React.createClass({displayName: "FontSquareLeft",
	handleClick: function() {
		this.props.setActive("left")
    
	},
  render: function() {
    var style = {
      "font-family":this.props.typeface.typeface
    };

  	return (
			React.createElement("div", {className: "square square-left square-selected", "data-type": this.props.typeface.typeface, onClick: this.handleClick, style: style}, 
				"G"
			)
  	);
  }
});

var FontSquareRight = React.createClass({displayName: "FontSquareRight",
	handleClick: function() {
		this.props.setActive("right");
	},
  render: function() {
  	return (
			React.createElement("div", {className: "square square-right", "data-type": this.props.typeface.typeface, onClick: this.handleClick}, 
				"G"
			)
  	);
  }
});

var FontBar = React.createClass({displayName: "FontBar",
  render: function() {
    return (
    	React.createElement("div", {className: "font-bar"}, 
	    	React.createElement(ArrowLeft, null), 
	    	React.createElement(FontsList, {data: this.props.data, setTypefaceLeft: this.props.setTypefaceLeft}), 
	    	
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
	fontOnClick: function(id, typeface) {
		console.log("oao");
		console.log(id);
		this.props.setTypefaceLeft(id, typeface);
	},
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			React.createElement(Font, {typeface: font.typeface, id: font.id, handleClick: this.fontOnClick})
  			
  		);
  	}.bind(this));
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
	fontClicked: function() {
  	this.props.handleClick(this.props.id, this.props.typeface);
  },
  render: function() { 
    var style = {"font-family": this.props.typeface};
    return (
    	React.createElement("li", {className: "font", id: this.props.id, onClick: this.fontClicked, style: style}, 
    		"G"
    	)
    );
  }
});

React.render(
	React.createElement(Container, {data: data, typefaceLeft: typefaceLeft, typefaceRight: typefaceRight, indicator: indicator}),
	document.getElementById("content")
);