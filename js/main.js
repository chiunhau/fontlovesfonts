// props
var data = [
  { id: 1, fontFamily: "wen1", top: 0},
  { id: 2, fontFamily: "wen2", top: 0},
  { id: 3, fontFamily: "wen3", top: 0},
  { id: 4, fontFamily: "wen4", top: 0},
  { id: 5, fontFamily: "wen5", top: 0},
  { id: 6, fontFamily: "wen6", top: 0},
  { id: 7, fontFamily: "wen7", top: 0},
  { id: 8, fontFamily: "wen8", top: 0},
  { id: 9, fontFamily: "wen9", top: 0},
  { id: 10, fontFamily: "wen10", top: 0},
];

// state

var Container = React.createClass({displayName: "Container",
	getInitialState: function() {
		return  { 
      typefaceLeft: data[0], 
      typefaceRight: data[1],
      indicator: {
        active: "left"
      }
    }
	},
	setTypefaceLeft: function(typeface) {
		this.setState({typefaceLeft: typeface});
	},
	setTypefaceRight: function(typeface) {
		this.setState({typefaceRight: typeface});
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
		this.props.setActive("left");
	},
  render: function() {
    var style = {
      top: this.props.typeface.top + "px",
      position: "relative"
    };

    var classes = 'square square-left ' +this.props.typeface.fontFamily;
    classes.concat((this.props.indicator.active === "left") ? 'square-selected' : '');

  	return (
			React.createElement("div", {className: classes, "data-type": this.props.typeface.fontFamily, onClick: this.handleClick}, 
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
      top: this.props.typeface.top + "px",
      position: "relative"
    };
    var classes = 'square square-right ' + this.props.typeface.fontFamily;
    classes.concat((this.props.indicator.active === "right") ? 'square-selected' : '');


  	return (
			React.createElement("div", {className: classes, "data-type": this.props.typeface.fontFamily, onClick: this.handleClick}, 
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
	fontOnClick: function(typeface) {
		console.log(typeface.id + '/' + typeface.fontFamily + '/' + typeface.top);
    if (this.props.indicator.active === "left") {
      this.props.setTypefaceLeft(typeface);
    }
    else {
      this.props.setTypefaceRight(typeface);
    }
	},
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			React.createElement(Font, {fontFamily: font.fontFamily, id: font.id, top: font.top, fontClicked: this.fontOnClick})
  		)
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
	handleClick: function() {
    var typeface = {
      id: this.props.id,
      fontFamily: this.props.fontFamily,
      top: this.props.top
    };
  	this.props.fontClicked(typeface);
  },
  render: function() { 
    var style = {
      position: "relative",
      top: this.props.top * 0.32 + "px"
    };
    var classes = 'font ' + this.props.fontFamily;
    return (
    	React.createElement("li", {className: classes, id: this.props.id, onClick: this.handleClick, style: style}, 
    		"字" 
    	)
    );
  }
});

React.render(
	React.createElement(Container, {data: data}),
	document.getElementById("content")
);