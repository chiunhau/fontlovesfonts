var data = [ {id: 1, typeface: "Futura"}, {id: 2, typeface: "Courier"}, {id: 3, typeface: "Hiragino"}, {id: 4, typeface: "Arial"}, {id: 5, typeface: "Avenir"}, {id: 6, typeface: "Rockwell"} ];

var FontBar = React.createClass({
  render: function() {
    return (
    	<ArrowLeft />
    	<FontsList />
    	<ArrowRight />
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

var FontsList = React.createClass({
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			<Font typeface={font.typeface}>
  			</Font>
  		);
  	});
  	return (
  		<div className="fontList">
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
    		嘿
    	</li>
    );
  }
});

React.render(
	<FontsList data={data} />,
	document.getElementById("content")
);