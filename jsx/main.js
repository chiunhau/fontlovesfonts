var data = [ 
	{id: 1, typeface: "Futura"}, 
	{id: 2, typeface: "Courier"}, 
	{id: 3, typeface: "Hiragino"}, 
	{id: 4, typeface: "Arial"}, 
	{id: 5, typeface: "Avenir"}, 
	{id: 6, typeface: "Rockwell"}, 
	{id: 7, typeface: "Courier Neue"}, 
	{id: 8, typeface: "Helvetica"}, 
	{id: 9, typeface: "Trajan"}, 
	{id: 10, typeface: "Glober"}
];

var typefaceLeft = { id: 1, typeface: "Futura" };
var typefaceRight = { id: 2, typeface: "Courier" };
var indicator = { active: "left"};

var Container = React.createClass({
	getInitialState: function() {
		return {typefaceLeft: {id: 1, typeface: "Futura"}, typefaceRight: {id: 2, typeface: "Courier"}}
	},
	setTypefaceLeft: function(id) {
		this.setState({typefaceLeft: {id: id, typeface: "Futura"}});
	},
	setTypefaceRight: function(id) {
		this.setState({typefaceRight: {id: id, typeface: "Courier"}});
	},
	setActive: function(side) {
		this.setState({indicator: {active: side}});
	},

  render: function() {
  	return (
			<div className="container">
				<FontBox typefaceLeft={this.state.typefaceLeft} typefaceRight={this.state.typefaceRight} indicator={this.state.indicator} setActive={this.setActive}/>
				<FontBar data={this.props.data} setTypefaceLeft={this.setTypefaceLeft}/>
			</div>
  	);
  }
});

var FontBox = React.createClass({
  render: function() {
	  return (
			<div className="font-box">
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
  	return (
			<div className="square square-left square-selected" data-type={this.props.typeface.typeface} onClick={this.handleClick}>
				{this.props.typeface.id}
			</div>
  	);
  }
});

var FontSquareRight = React.createClass({
	handleClick: function() {
		this.props.setActive("<right></right>")
	},
  render: function() {
  	return (
			<div className="square square-right" data-type={this.props.typeface.typeface}>
				{this.props.typeface.id}
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
	fontOnClick: function(id) {
		console.log("oao");
		console.log(id);
		this.props.setTypefaceLeft(id);
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
  	this.props.handleClick(this.props.id);
  },
  render: function() { 
    return (
    	<li className="font" id={this.props.id} onClick={this.fontClicked}>
    		{this.props.id}
    	</li>
    );
  }
});

React.render(
	<Container data={data} typefaceLeft={typefaceLeft} typefaceRight={typefaceRight} indicator={indicator} />,
	document.getElementById("content")
);