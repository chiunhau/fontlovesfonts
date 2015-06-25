// props
var data = [ 
  {id: 1, fontFamily: "chekiangshukesung", top: -55}, 
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
var typefaceLeft, typefaceRight, indicator;

var Container = React.createClass({
	getInitialState: function() {
		return  { 
      typefaceLeft: {
        id: 1,
        fontFamily: "chekiangshukesung",
        top: -55
      }, 
      typefaceRight: {
        id: 2,
        fontFamily: "datf5",
        top: -10
      },
      indicator: {
        active: "left"
      }
    }
	},
	setTypefaceLeft: function(id, fontFamily, top) {
		this.setState({typefaceLeft: {id: id, fontFamily: fontFamily, top: top}});
	},
	setTypefaceRight: function(id, fontFamily, top) {
		this.setState({typefaceRight: {id: id, fontFamily: fontFamily, top: top}});
	},
	setActive: function(side) {
    console.log(side);
		this.setState({indicator: {active: side}});
	},

  render: function() {
  	return (
			<div className="container" >
				<FontBox typefaceLeft={this.state.typefaceLeft} typefaceRight={this.state.typefaceRight} indicator={this.state.indicator} setActive={this.setActive}/>
				<FontBar data={this.props.data} setTypefaceLeft={this.setTypefaceLeft} setTypefaceRight={this.setTypefaceRight} indicator={this.state.indicator}/>
			</div>
  	);
  }
});

var FontBox = React.createClass({

  render: function() {
	  return (
			<div className="font-box" data-side={this.props.indicator.active}>
				<FontSquareLeft typeface={this.props.typefaceLeft} setActive={this.props.setActive} indicator={this.props.indicator}/>
				<FontSquareRight typeface={this.props.typefaceRight} setActive={this.props.setActive} indicator={this.props.indicator} />
			</div>
  	);
     
  }
});

var FontSquareLeft = React.createClass({
	handleClick: function() {
		this.props.setActive("left")
    
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
      fontFamily: this.props.typeface.fontFamily,
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
			<div className={classes} data-type={this.props.typeface.fontFamily} onClick={this.handleClick} >
				<span style={style}>字</span>
			</div>
  	);
  }
});

var FontBar = React.createClass({
  render: function() {
    return (
    	<div className="font-bar">
	    	<ArrowLeft />
	    	<FontsList data={this.props.data} setTypefaceLeft={this.props.setTypefaceLeft} setTypefaceRight={this.props.setTypefaceRight}indicator={this.props.indicator}/>
	    	
	    	<ArrowRight />
	    </div>
    );
  }
});

var ArrowLeft = React.createClass({
  render: function() {
    return (
    	<div className="arrow-left"></div>
  	);
  }
});

var ArrowRight = React.createClass({
  render: function() {
    return (
    	<div className="arrow-right"></div>
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
	fontOnClick: function(id, fontFamily, top) {
		console.log(id + '-' + fontFamily + '-' + top);
    if (this.props.indicator.active === "left") {
      this.props.setTypefaceLeft(id, fontFamily, top);
    }
    else {
      this.props.setTypefaceRight(id, fontFamily, top);
    }
		
	},
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			<Font fontFamily={font.fontFamily} id={font.id} top={font.top} fontClicked={this.fontOnClick} />
  			
  		);
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
  	this.props.fontClicked(this.props.id, this.props.fontFamily, this.props.top);
  },
  render: function() { 
    var style = {
      fontFamily: this.props.fontFamily,
      position: "relative",
      top: this.props.top * 0.36 + "px"
    };
    return (
    	<li className="font" id={this.props.id} onClick={this.handleClick} style={style}>
    		字 
    	</li>
    );
  }
});

React.render(
	<Container data={data} typefaceLeft={typefaceLeft} typefaceRight={typefaceRight} indicator={indicator} />,
	document.getElementById("content")
);