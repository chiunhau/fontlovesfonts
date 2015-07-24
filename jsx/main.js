// props
var data = [
  { id: 0,  fontFamily: "", top: 0, type: "明體"},
  { id: 1,  fontFamily: "wen1", top: 5, type: "明體"},
  { id: 2,  fontFamily: "wen2", top: 5, type: "黑體"},
  { id: 3,  fontFamily: "wen3", top: 0, type: "宋體"},
  { id: 4,  fontFamily: "wen4", top: 0, type: "黑體"},
  { id: 5,  fontFamily: "wen5", top: 0, type: "圓體"},
  { id: 6,  fontFamily: "wen6", top: 0, type: "隸書"},
  { id: 7,  fontFamily: "wen7", top: 0, type: "楷體"},
  { id: 8,  fontFamily: "wen8", top: -10, type: "行書"},
  { id: 9,  fontFamily: "wen9", top: -10, type: "宋體"},
  { id: 10, fontFamily: "wen10", top: 0, type: "圓體"},
  { id: 11, fontFamily: "chekiangshukesung", top: -93, type: "明體"}, 
  { id: 12, fontFamily: "datf5", top: -52, type: "宋體"}, 
  { id: 13, fontFamily: "dasa5", top: -15, type: "姚體"}, 
  { id: 14, fontFamily: "xingothic-tc-w4", top: 0, type: "黑體"},
  { id: 15, fontFamily: "dath1", top: -50, type: "黑體"},
  { id: 16, fontFamily: "sourcehansans-tc-normal", top: -60, type: "黑體"},
  { id: 17, fontFamily: "wcl-07", top: -30, type: "楷體"},
  { id: 18, fontFamily: "dast5", top: -20, type: "楷體"},
  { id: 19, fontFamily: "datc5", top: -23, type: "行書"},
  { id: 20, fontFamily: "hanamin", top: -30, type: "明體"},
  { id: 21,  fontFamily: "", top: 0, type: "明體"},
];

// state

var Container = React.createClass({
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
    console.log(this.state.typefaceLeft)
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
			<div className="container" >
				<FontBox typefaceLeft={this.state.typefaceLeft} typefaceRight={this.state.typefaceRight} indicator={this.state.indicator} setActive={this.setActive}/>
        <hr />  
				<FontBar data={this.props.data} setTypefaceLeft={this.setTypefaceLeft} setTypefaceRight={this.setTypefaceRight} indicator={this.state.indicator}/>
			</div>
  	);
  }
});

var FontBox = React.createClass({
  render: function() {
	  return (
			<div className="font-box" data-side={this.props.indicator.active}>
        <IndicatorBox indicator={this.props.indicator} />
				<FontSquareLeft typeface={this.props.typefaceLeft} setActive={this.props.setActive} indicator={this.props.indicator}/>
				<FontSquareRight typeface={this.props.typefaceRight} setActive={this.props.setActive} indicator={this.props.indicator} />
        <FontSquareLeftDesc type={this.props.typefaceLeft.type} />
        <FontSquareRightDesc type={this.props.typefaceRight.type} />
			</div>
  	);  
  }
});
var IndicatorBox = React.createClass({
  render: function() {
    return (
      <div className="indicator-box">
        <IndicatorLeft indicator={this.props.indicator} />
        <IndicatorRight indicator={this.props.indicator} />
      </div>
    );
  }
});

var IndicatorLeft = React.createClass({
  render: function() {
    var classes = 'indicator indicator-left ';
    classes += (this.props.indicator.active == "left") ? 'active' : '';
    return (
      <div className={classes}></div>
    );
  }
});

var IndicatorRight = React.createClass({
  render: function() {
    var classes = 'indicator indicator-right ';
    classes += (this.props.indicator.active == "right") ? 'active' : '';
    return (
      <div className={classes}></div>
    );
  }
});

var FontSquareLeft = React.createClass({
	handleClick: function() {
		this.props.setActive("left");
	},
  render: function() {
    var style = {
      top: this.props.typeface.top + "px",
      position: "relative",
      display: "block"
    };

    var styleDisc = {
      top: this.props.typeface.top + "px",
    };

    var classes = 'square square-left ' +this.props.typeface.fontFamily;
    classes.concat((this.props.indicator.active === "left") ? 'square-selected' : '');

  	return (
			<div className={classes} data-type={this.props.typeface.fontFamily} onClick={this.handleClick} >
				<span style={style}>字</span> 
			</div>

  	);
  }
});

var FontSquareRight = React.createClass({
	handleClick: function() {
		this.props.setActive("right");
	},
  render: function() {
    var style = {
      top: this.props.typeface.top + "px",
      position: "relative",
      display: "block"
    };

    var styleDisc = {
      top: this.props.typeface.top + "px",
    };

    var classes = 'square square-right ' + this.props.typeface.fontFamily;
    classes.concat((this.props.indicator.active === "right") ? 'square-selected' : '');


  	return (
			<div className={classes} data-type={this.props.typeface.fontFamily} onClick={this.handleClick} >
				<span style={style}>字</span>
			</div>
  	);
  }
});

var FontSquareLeftDesc = React.createClass({
  render: function() {
    return (
      <div className="fontSquareLeftDesc">
        <span>
          {this.props.type}
        </span>
      </div>
    );
  }
});

var FontSquareRightDesc = React.createClass({
  render: function() {
    return (
      <div className="fontSquareRightDesc">
        <span>
          {this.props.type}
        </span>
      </div>
    );
  }
});

var FontBar = React.createClass({
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
    	<div className="font-bar">
	    	<ArrowLeft clickLeft={this.clickLeft} stage={this.state.stage} />
        <FontsList data={this.props.data} setTypefaceLeft={this.props.setTypefaceLeft} setTypefaceRight={this.props.setTypefaceRight} indicator={this.props.indicator} stage={this.state.stage} />
	    	
        <ArrowRight clickRight={this.clickRight} stage={this.state.stage} />
	    </div>
    );
  }
});

var ArrowLeft = React.createClass({
  handleClick: function() {
    console.log("hola");
    this.props.clickLeft();
  },
  render: function() {
    return (
    	<div className="arrow-left" onClick={this.handleClick}></div>
  	);
  }
});

var ArrowRight = React.createClass({
  handleClick: function() {
    console.log("hola");
    this.props.clickRight();
  },
  render: function() {
    return (
    	<div className="arrow-right" onClick={this.handleClick}></div>
  	);
  }
});

var BarMask = React.createClass({
  render: function() {
  	return (
  		<div className="bar-mask"></div>
  	);
  }
});

var FontsList = React.createClass({
	fontOnClick: function(typeface) {
		console.log(typeface.id + '/' + typeface.fontFamily + '/' + typeface.top + '/' + typeface.type);
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
  			<Font fontFamily={font.fontFamily} id={font.id} top={font.top} type={font.type}fontClicked={this.fontOnClick} stage={this.props.stage}/>
  		)
  	}.bind(this));
  	return (

  		<div className="font-list">
  			<ul>
  				{fontNodes}
  			</ul>
  		</div>
  	);
  }
});

var Font = React.createClass({
	handleClick: function() {
    var typeface = {
      id: this.props.id,
      fontFamily: this.props.fontFamily,
      top: this.props.top,
      type: this.props.type
    };
    console.log(this.props.type);
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
    	<li className={classes} id={this.props.id} onClick={this.handleClick} style={style}>
    		字 
    	</li>
    );
  }
});

React.render(
	<Container data={data} />,
	document.getElementById("content")
);