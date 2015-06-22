var data = [ {typeface: "Futura"}, {typeface: "Courier"} ];

var FontsList = React.createClass({
  render: function() {
  	var fontNodes = this.props.data.map(function(font){
  		return (
  			<Font>
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
  render: function() {
    return (
    	<li className="font">
    		嘿
    	</li>
    );
  }
});

React.render(
	<FontsList data={data} />,
	document.getElementById("content")
);