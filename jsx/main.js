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

var Container = React.createClass({
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
      position: "relative"
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

var FontBar = React.createClass({
  render: function() {
    return (
    	<div className="font-bar">
	    	<ArrowLeft />
	    	<FontsList data={this.props.data} setTypefaceLeft={this.props.setTypefaceLeft} setTypefaceRight={this.props.setTypefaceRight} indicator={this.props.indicator}/>
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
  			<Font fontFamily={font.fontFamily} id={font.id} top={font.top} fontClicked={this.fontOnClick} />
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