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
  {id: 1, typeface: "chekiangshukesung"}, 
  {id: 2, typeface: "datf5"}, 
  {id: 3, typeface: "dasa5"}, 
  {id: 4, typeface: "xingothic-tc"}
];

var typefaceLeft = { id: 1, typeface: "chekiangshukesung" };
var typefaceRight = { id: 2, typeface: "datf5" };
var indicator = { active: "left"};

var Container = React.createClass({
	getInitialState: function() {
		return {typefaceLeft: {id: 1, typeface: "chekiangshukesung"}, typefaceRight: {id: 2, typeface: "datf5"}, indicator: {active: "left"}}
	},
	setTypefaceLeft: function(id, typeface) {
		this.setState({typefaceLeft: {id: id, typeface: typeface}});
	},
	setTypefaceRight: function(id, typeface) {
		this.setState({typefaceRight: {id: id, typeface: typeface}});
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
      fontFamily:this.props.typeface.typeface
    };
    var cx = React.addons.classSet;
    var classes = cx({
      'square': true,
      'square-left': true,
      'square-selected': ((this.props.indicator.active === "left") ? true : false)
    });

  	return (
			<div className={classes} data-type={this.props.typeface.typeface} onClick={this.handleClick} style={style}>
				<span>字</span>
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
      fontFamily:this.props.typeface.typeface
    };
    var cx = React.addons.classSet;
    var classes = cx({
      'square': true,
      'square-left': true,
      'square-selected': ((this.props.indicator.active === "right") ? true : false)
    });
  	return (
			<div className={classes} data-type={this.props.typeface.typeface} onClick={this.handleClick} style={style}>
				<span>字</span>
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
	fontOnClick: function(id, typeface) {
		console.log(id + '-' + typeface);
    if (this.props.indicator.active === "left") {
      this.props.setTypefaceLeft(id, typeface);
    }
    else {
      this.props.setTypefaceRight(id, typeface);
    }
		
	},
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			<Font typeface={font.typeface} id={font.id} handleClick={this.fontOnClick} />
  			
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
	fontClicked: function() {
  	this.props.handleClick(this.props.id, this.props.typeface);
  },
  render: function() { 
    var style = {fontFamily: this.props.typeface};
    return (
    	<li className="font" id={this.props.id} onClick={this.fontClicked} style={style}>
    		字 
    	</li>
    );
  }
});

React.render(
	<Container data={data} typefaceLeft={typefaceLeft} typefaceRight={typefaceRight} indicator={indicator} />,
	document.getElementById("content")
);