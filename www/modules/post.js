var Post = React.createClass({
  getInitialState: function(){
    // get all tags
      return({
          // define variables here
          username: "",
          title: "",
          content: "",
          tags: [],
          comments: []
      });
  },
  componentWillMount: function(){
    // load data using RESTful call
    fetch('/api/post/'+this.props.id)
    .then(function(data){

        return data.json();


    }).then(json => {

          this.setState({
            username: "To do",
            title: json.title,
            content: json.content,
            tags: json.tags,
            comments: json.comments
          });

    });
  },
  componentDidMount: function(){

  },

  render: function(){
    var comments;
    if(this.state.comments.length!=0){
      comments = this.state.comments;
      comments=this.state.comments.map(function(element, index){
        return (
          <p className="comment">
            <span className="author">{element.author}</span>
            {element.body} - Thanks: {element.thanks.length} times
            <span className="thanksbutton">Thanks</span>
          </p>
        );
      });
    } else {
      comments="No Comments on Post";
    }

    return(
      <div className="statusPost">
        <b>Author: </b>{this.state.author}<br/><br/>
        <b>Title:</b> {this.state.title}<br/>
        <b>Content:</b> {this.state.content}<br/>
        <b>Tags: </b> {this.state.tags}<br/>
        <b>Comments: </b>
        {comments}
      </div>

    );
  }
});
