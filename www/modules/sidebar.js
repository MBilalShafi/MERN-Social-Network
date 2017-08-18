var Sidebar = React.createClass({
  getInitialState: function(){
    // get all tags
      return({
          // define variables here
          tags: [],
          arb: 1
      });
  },
  componentWillUpdate: function(){
    //console.log("[Sidebar] this.props.tagRefreshNeeded: "+this.props.tagRefreshNeeded);
    this.state.arb++;
  },
  getTags: function(){
      fetch('/api/tags/').then(function(data){
          return data.json();
      }).then(json => {
          //console.log("Tags: "+json);
          this.setState({
            tags: json
          });
      });
  },

  componentDidMount: function(){
    this.getTags();
  },

  render: function(){
    console.log("[Sidebar] this.props.tagRefreshNeeded: "+this.props.tagRefreshNeeded);
    var tags="";
    if(this.state.tags.length!=0){
      tags = this.state.tags;
      //this.deleteValue=this.deleteValue.bind(this);
      tags = tags.map(function(tag, index){
          return(
            <div className="hashTag">
              #{tag.name}
            </div>

          );
      }, this);
    } else {
      tags="No Tags Yet";
    }
    const sidebarStyle  = {
      border: '3px solid #000'
    };
    return(
        <div className="sidebar-container">
          <h2>Popular tags:</h2>
          <div className="hashtags">
            {tags}
          </div>
        </div>

    );
  }
});
