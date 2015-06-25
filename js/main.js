// var data = [ 
// 	{id: 1, typeface: "futura"}, 
// 	{id: 2, typeface: "courier"}, 
// 	{id: 3, typeface: "verdana"}, 
// 	{id: 4, typeface: "arial"}, 
// 	{id: 5, typeface: "avenir"}, 
// 	{id: 6, typeface: "rockwell"}, 
// 	{id: 7, typeface: "impact"}, 
// 	{id: 8, typeface: "helvetica"}, 
// 	{id: 9, typeface: "Lucida Console"}, 
// 	{id: 10, typeface: "georgia"}
// ];

var data = [ 
  {id: 1, typeface: "chekiangshukesung", top: -55}, 
  {id: 2, typeface: "datf5", top: -10}, 
  {id: 3, typeface: "dasa5", top: -10}, 
  {id: 4, typeface: "xingothic-tc", top: -35}
];

var typefaceLeft = { id: 1, typeface: "chekiangshukesung", top: -55 };
var typefaceRight = { id: 2, typeface: "datf5", top: -10};
var indicator = { active: "left"};

var Container = React.createClass({displayName: "Container",
	getInitialState: function() {
		return {typefaceLeft: {id: 1, typeface: "chekiangshukesung", top: -55}, typefaceRight: {id: 2, typeface: "datf5", top: -10}, indicator: {active: "left"}}
	},
	setTypefaceLeft: function(id, typeface, top) {
		this.setState({typefaceLeft: {id: id, typeface: typeface, top: top}});
	},
	setTypefaceRight: function(id, typeface, top) {
		this.setState({typefaceRight: {id: id, typeface: typeface, top: top}});
	},
	setActive: function(side) {
    console.log(side);
		this.setState({indicator: {active: side}});
	},

  render: function() {
  	return (
			React.createElement("div", {className: "container"}, 
				React.createElement(FontBox, {typefaceLeft: this.state.typefaceLeft, typefaceRight: this.state.typefaceRight, indicator: this.state.indicator, setActive: this.setActive}), 
				React.createElement(FontBar, {data: this.props.data, setTypefaceLeft: this.setTypefaceLeft, setTypefaceRight: this.setTypefaceRight, indicator: this.state.indicator})
			)
  	);
  }
});

var FontBox = React.createClass({displayName: "FontBox",

  render: function() {
	  return (
			React.createElement("div", {className: "font-box", "data-side": this.props.indicator.active}, 
				React.createElement(FontSquareLeft, {typeface: this.props.typefaceLeft, setActive: this.props.setActive, indicator: this.props.indicator}), 
				React.createElement(FontSquareRight, {typeface: this.props.typefaceRight, setActive: this.props.setActive, indicator: this.props.indicator})
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
      fontFamily:this.props.typeface.typeface,
      top: this.props.typeface.top + "px",
      position: "relative"
    };
    var cx = React.addons.classSet;
    var classes = cx({
      'square': true,
      'square-left': true,
      'square-selected': ((this.props.indicator.active === "left") ? true : false)
    });

  	return (
			React.createElement("div", {className: classes, "data-type": this.props.typeface.typeface, onClick: this.handleClick}, 
				React.createElement("span", {style: style}, "字")
			)
  	);
  }
});

var FontSquareRight = React.createClass({displayName: "FontSquareRight",
	handleClick: function() {
		this.props.setActive("right");
	},
  render: function() {
    var style = {
      fontFamily: this.props.typeface.typeface,
      top: this.props.typeface.top + "px",
      position: "relative"
    };
    var cx = React.addons.classSet;
    var classes = cx({
      'square': true,
      'square-left': true,
      'square-selected': ((this.props.indicator.active === "right") ? true : false)
    });
  	return (
			React.createElement("div", {className: classes, "data-type": this.props.typeface.typeface, onClick: this.handleClick}, 
				React.createElement("span", {style: style}, "字")
			)
  	);
  }
});

var FontBar = React.createClass({displayName: "FontBar",
  render: function() {
    return (
    	React.createElement("div", {className: "font-bar"}, 
	    	React.createElement(ArrowLeft, null), 
	    	React.createElement(FontsList, {data: this.props.data, setTypefaceLeft: this.props.setTypefaceLeft, setTypefaceRight: this.props.setTypefaceRight, indicator: this.props.indicator}), 
	    	
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
	fontOnClick: function(id, typeface, top) {
		console.log(id + '-' + typeface + '-' + top);
    if (this.props.indicator.active === "left") {
      this.props.setTypefaceLeft(id, typeface, top);
    }
    else {
      this.props.setTypefaceRight(id, typeface, top);
    }
		
	},
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			React.createElement(Font, {typeface: font.typeface, id: font.id, top: font.top, handleClick: this.fontOnClick})
  			
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
  	this.props.handleClick(this.props.id, this.props.typeface, this.props.top);
  },
  render: function() { 
    var style = {
      fontFamily: this.props.typeface,
      position: "relative",
      top: this.props.top * 0.36 + "px"
    };
    return (
    	React.createElement("li", {className: "font", id: this.props.id, onClick: this.fontClicked, style: style}, 
    		"字" 
    	)
    );
  }
});

React.render(
	React.createElement(Container, {data: data, typefaceLeft: typefaceLeft, typefaceRight: typefaceRight, indicator: indicator}),
	document.getElementById("content")
);