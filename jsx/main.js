var data = [ {typeface: "Futura"}, {typeface: "Courier"}, {typeface: "Hiragino"}, {typeface: "Arial"}, {typeface: "Avenir"}, {typeface: "Rockwell"} ];

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