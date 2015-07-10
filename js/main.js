// props
var data = [
  { id: 0,  fontFamily: "", top: 0},
  { id: 1,  fontFamily: "wen1", top: 0},
  { id: 2,  fontFamily: "wen2", top: 0},
  { id: 3,  fontFamily: "wen3", top: 0},
  { id: 4,  fontFamily: "wen4", top: 0},
  { id: 5,  fontFamily: "wen5", top: 0},
  { id: 6,  fontFamily: "wen6", top: 0},
  { id: 7,  fontFamily: "wen7", top: 0},
  { id: 8,  fontFamily: "wen8", top: 0},
  { id: 9,  fontFamily: "wen9", top: -10},
  { id: 10, fontFamily: "wen10", top: 0},
  { id: 11, fontFamily: "chekiangshukesung", top: -93}, 
  { id: 12, fontFamily: "datf5", top: -52}, 
  { id: 13, fontFamily: "dasa5", top: -15}, 
  { id: 14, fontFamily: "xingothic-tc-w4", top: 0},
  { id: 15, fontFamily: "dath1", top: -50},
  { id: 16, fontFamily: "sourcehansans-tc-normal", top: -60},
  { id: 17, fontFamily: "wcl-07", top: -30},
  { id: 18, fontFamily: "dast5", top: -20},
  { id: 19, fontFamily: "datc5", top: -23},
  { id: 20, fontFamily: "hanamin", top: -30},
  { id: 21,  fontFamily: "", top: 0},
];

// state

var Container = React.createClass({displayName: "Container",
	getInitialState: function() {
		return  { 
      typefaceLeft: data[1], 
      typefaceRight: data[2],
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
        React.createElement("hr", null), 
				React.createElement(FontBar, {data: this.props.data, setTypefaceLeft: this.setTypefaceLeft, setTypefaceRight: this.setTypefaceRight, indicator: this.state.indicator})
			)
  	);
  }
});

var FontBox = React.createClass({displayName: "FontBox",
  render: function() {
	  return (
			React.createElement("div", {className: "font-box", "data-side": this.props.indicator.active}, 
        React.createElement(IndicatorBox, {indicator: this.props.indicator}), 
				React.createElement(FontSquareLeft, {typeface: this.props.typefaceLeft, setActive: this.props.setActive, indicator: this.props.indicator}), 
				React.createElement(FontSquareRight, {typeface: this.props.typefaceRight, setActive: this.props.setActive, indicator: this.props.indicator})
			)
  	);  
  }
});
var IndicatorBox = React.createClass({displayName: "IndicatorBox",
  render: function() {
    return (
      React.createElement("div", {className: "indicator-box"}, 
        React.createElement(IndicatorLeft, {indicator: this.props.indicator}), 
        React.createElement(IndicatorRight, {indicator: this.props.indicator})
      )
    );
  }
});

var IndicatorLeft = React.createClass({displayName: "IndicatorLeft",
  render: function() {
    var classes = 'indicator indicator-left ';
    classes += (this.props.indicator.active == "left") ? 'active' : '';
    return (
      React.createElement("div", {className: classes})
    );
  }
});

var IndicatorRight = React.createClass({displayName: "IndicatorRight",
  render: function() {
    var classes = 'indicator indicator-right ';
    classes += (this.props.indicator.active == "right") ? 'active' : '';
    return (
      React.createElement("div", {className: classes})
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
  getInitialState: function() {
    return {
      stage: {
        first: 0,
        last: 11
      }
    }
  },
  clickRight: function() {
    var stageFirst = this.state.stage.first;
    var stageLast = this.state.stage.last;
    if (stageLast != 21) {
      this.setState({
        stage: {
          first: stageFirst + 1,
          last: stageLast + 1,
        },
      });
    };
    
    console.log(this.state.stage.first);
  },
  clickLeft: function() {
    var stageFirst = this.state.stage.first;
    var stageLast = this.state.stage.last;
    if(stageFirst != 0) {
      this.setState({
        stage: {
          first: stageFirst - 1,
          last: stageLast - 1,
        },
      });
    };
    
    console.log(this.state.stage.first);
  },
  render: function() {
    return (
    	React.createElement("div", {className: "font-bar"}, 
	    	React.createElement(ArrowLeft, {clickLeft: this.clickLeft}), 
        React.createElement(FontsList, {data: this.props.data, setTypefaceLeft: this.props.setTypefaceLeft, setTypefaceRight: this.props.setTypefaceRight, indicator: this.props.indicator, stage: this.state.stage}), 
	    	
        React.createElement(ArrowRight, {clickRight: this.clickRight})
	    )
    );
  }
});

var ArrowLeft = React.createClass({displayName: "ArrowLeft",
  handleClick: function() {
    console.log("hola");
    this.props.clickLeft();
  },
  render: function() {
    return (
    	React.createElement("div", {className: "arrow-left", onClick: this.handleClick})
  	);
  }
});

var ArrowRight = React.createClass({displayName: "ArrowRight",
  handleClick: function() {
    console.log("hola");
    this.props.clickRight();
  },
  render: function() {
    return (
    	React.createElement("div", {className: "arrow-right", onClick: this.handleClick})
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
  			React.createElement(Font, {fontFamily: font.fontFamily, id: font.id, top: font.top, fontClicked: this.fontOnClick, stage: this.props.stage})
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
      top: this.props.top * 0.161 + "px",
      opacity: ( this.props.id === this.props.stage.first || this.props.id === this.props.stage.last) ? '0' : '1', 
      display: ( this.props.id >= this.props.stage.first && this.props.id <= this.props.stage.last) ? 'inline' : 'none', 
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