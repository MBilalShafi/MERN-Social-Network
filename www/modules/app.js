var App = React.createClass({
  getInitialState: function(){

      return({
          // define variables here
          //tagRefreshNeeded:false
          tags: [],
          variable1: 1,
          postType: 'user'
      });
  },
  getChildContext() {
    return {
      val: this.state.variable1,
      postType: this.state.postType
    };
  },
  setTagRefresh: function(){
    console.log("Speaking from setTagRefresh");
    this.getChildContext();
    this.getTags();
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
    this.getChildContext();
    //this.getChildContext();
  },
  componentWillUpdate(){
    this.getChildContext();
  },
  setPostType: function(postType){

    this.setState({
      postType: postType
    });

  },
  render: function(){
    var tags="";
    if(this.state.tags.length!=0){
      tags = this.state.tags;
      //this.deleteValue=this.deleteValue.bind(this);
      tags = tags.map(function(tag, index){
          return(
            <div className="hashtag">
              <a onClick={() => this.setPostType(tag.name)}>{tag.name}</a>
            </div>

          );
      }, this);
    } else {
      tags="No Tags Yet";
    }
//<Sidebar tagRefreshNeeded={this.state.tagRefreshNeeded} />
    return(
      <div class="app-container">
        <Navbar />
        <div className="row">
          <div className="col-md-3">

            <div className="sidebar-container">
              <h2>Popular tags:</h2>
              <div className="hashtags">
                {tags}
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <Timeline onPostUpdate={this.setTagRefresh} setPostTypeToUser={() => this.setPostType('user')}/>
          </div>
        </div>
      </div>
    );
  }
});


App.childContextTypes = {
  val: PropTypes.string,
  postType: PropTypes.string
}
ReactDOM.render(<App></App>, document.getElementById('users'));
