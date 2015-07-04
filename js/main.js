// props
var data = [ 
  {id: 1, fontFamily: "chekiangshukesung", top: -80}, 
  {id: 2, fontFamily: "datf5", top: -6}, 
  {id: 3, fontFamily: "dasa5", top: -10}, 
  {id: 4, fontFamily: "xingothic-tc", top: -38},
  {id: 5, fontFamily: "dath1", top: -10},
  {id: 6, fontFamily: "sourcehansans-tc", top: -38},
  {id: 7, fontFamily: "wcl-07", top: -10},
  {id: 8, fontFamily: "dast5", top: -10},
  {id: 9, fontFamily: "datc5", top: -10},
  {id: 10, fontFamily: "hanamin", top: -15}
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
      fontFamily:this.props.typeface.fontFamily,
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
      fontFamily: this.props.typeface.fontFamily,
      top: this.props.typeface.top + "px",
      position: "relative"
    };
    var cx = React.addons.classSet;
    var classes = cx({
      'square': true,
      'square-right': true,
      'square-selected': ((this.props.indicator.active === "right") ? true : false)
    });
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
      fontFamily: this.props.fontFamily,
      position: "relative",
      top: this.props.top * 0.32 + "px"
    };
    return (
    	React.createElement("li", {className: "font", id: this.props.id, onClick: this.handleClick, style: style}, 
    		"字" 
    	)
    );
  }
});

React.render(
	React.createElement(Container, {data: data}),
	document.getElementById("content")
);