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

var Container = React.createClass({
  render: function() {
  	return (
			<div className="container">
				<FontBox />
				<FontBar data={this.props.data} />
			</div>
  	);
  }
});

var FontBox = React.createClass({
  render: function() {
	  return (
			<div className="font-box">
				<FontSquareLeft />
				<FontSquareRight />
			</div>
  	);
     
  }
});

var FontSquareLeft = React.createClass({
  render: function() {
  	return (
			<div className="square square-left">
				呦
			</div>
  	);
  }
});

var FontSquareRight = React.createClass({
  render: function() {
  	return (
			<div className="square square-right">
				嘿
			</div>
  	);
  }
});

var FontBar = React.createClass({
  render: function() {
    return (
    	<div className="font-bar">
	    	<ArrowLeft />
	    	<FontsList data={this.props.data}/>
	    	<BarMask />
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
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			<Font typeface={font.typeface} id={font.id}>
  			</Font>
  		);
  	});
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
		this.setState({
			isSelected: true
		})	
	},
  render: function() {
    return (
    	<li className="font" id={this.props.typeface} onClick={this.handleClick}>
    		{this.props.id}
    	</li>
    );
  }
});

React.render(
	<Container data={data} />,
	document.getElementById("content")
);