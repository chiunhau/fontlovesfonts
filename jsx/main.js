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

var Container = React.createClass({
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
			<div className="container" >
				<FontBox typefaceLeft={this.state.typefaceLeft} typefaceRight={this.state.typefaceRight} indicator={this.state.indicator} setActive={this.setActive}/>
				<FontBar data={this.props.data} setTypefaceLeft={this.setTypefaceLeft}/>
			</div>
  	);
  }
});

var FontBox = React.createClass({
  render: function() {
	  return (
			<div className="font-box" data-side={this.props.indicator.active}>
				<FontSquareLeft typeface={this.props.typefaceLeft} setActive={this.props.setActive} />
				<FontSquareRight typeface={this.props.typefaceRight} setActive={this.props.setActive} />
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
      "font-family":this.props.typeface.typeface
    };

  	return (
			<div className="square square-left square-selected" data-type={this.props.typeface.typeface} onClick={this.handleClick} style={style}>
				G
			</div>
  	);
  }
});

var FontSquareRight = React.createClass({
	handleClick: function() {
		this.props.setActive("right");
	},
  render: function() {
  	return (
			<div className="square square-right" data-type={this.props.typeface.typeface} onClick={this.handleClick}>
				G
			</div>
  	);
  }
});

var FontBar = React.createClass({
  render: function() {
    return (
    	<div className="font-bar">
	    	<ArrowLeft />
	    	<FontsList data={this.props.data} setTypefaceLeft={this.props.setTypefaceLeft} />
	    	
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
		console.log("oao");
		console.log(id);
		this.props.setTypefaceLeft(id, typeface);
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
    var style = {"font-family": this.props.typeface};
    return (
    	<li className="font" id={this.props.id} onClick={this.fontClicked} style={style}>
    		G
    	</li>
    );
  }
});

React.render(
	<Container data={data} typefaceLeft={typefaceLeft} typefaceRight={typefaceRight} indicator={indicator} />,
	document.getElementById("content")
);