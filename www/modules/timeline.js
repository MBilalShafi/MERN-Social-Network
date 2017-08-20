var Timeline = React.createClass({
  //this.handleSubmit = this.handleSubmit.bind(this)

    getInitialState: function(){

        return({
            step: 1,
            errorMessage: "Click on Button to Continue",
            username:"",
            _id:"",
            posts:[],
            postContentBase: 'user'
        });
    },

    componentWillUpdate: function(){
      console.log("Timeline: I got updated: "+this.context.postType);
      this.getAllPosts();

      // this.callRefreshTags();

    },

    componentDidMount: function(){
      console.log("Timeline: I got updated: "+this.context.postType);
      this.getAllPosts();
    },

    callRefreshTags: function(){
      this.props.onPostUpdate();
    },

    render: function(){
      var posts="";
      //console.log(this.state.posts);
      if(this.state.posts.length!=0){
        posts = this.state.posts;
        //this.deleteValue=this.deleteValue.bind(this);
        posts = posts.map(function(post, index){
            return(
              <Post id={post._id} user={this.state.username} />
            );
        }, this);
      } else {
        posts="No Posts Yet";
      }

      switch (this.state.step) {
        case 1: // login <Post id="123" user="abc" />
        return(

            <div id="user-container">

              <h1>Login to System:</h1>
              <hr />
              <form id="add" onSubmit={this.handleLogin}>
                  <label>Username / Email:</label>
                  <input type="text" ref="loginUsername" id="name01" placeholder="your username"  />
                  <label>Password:</label>
                  <input type="password" ref="loginPwd"  />

                  <input type="submit" value="Login" />
                  <p align="center"  className="pee">
                  <a onClick={this.showRegister} className="text-center">Register</a>
                  </p>
                  <p className="pee" align="center">
                    {this.state.errorMessage}
                  </p>
              </form>
              <hr />

            </div>

          );
        case 2: // register
            return (

              <div id="user-container">
              <h1>Register to System:</h1>
              <hr />
              <form id="register" onSubmit={this.handleRegister}>
                  <label>Username:</label>
                  <input type="text" ref="regUsername" id="name01" placeholder="your username"  />
                  <label>Password:</label>
                  <input type="password" ref="regPwd"  />
                  <label>Email:</label>
                  <input type="text" ref="regEmail" id="name01" placeholder="your email"  />
                  <label>Gender:</label>
                  <input type="text" ref="regGender" id="name01" placeholder="male/female"  />


                  <input type="submit" value="Register" />
                    <p align="center"  className="pee">
                  <a onClick={this.showLogin} className="text-center">Login</a></p>
                  <p className="pee" align="center">
                    {this.state.errorMessage}
                  </p>
              </form>

              <hr />
              </div>

            );
            //<label>Image:</label>
            //<input type="file" ref="file" placeholder="select an image file"  />
        case 3: // logged in
          return (

            <div id="user-container">
            <h1>Welcome <a onClick={this.props.setPostTypeToUser} title="Show Timeline">{this.state.username}</a> <a onClick={this.logOut}>Logout</a></h1>
            <hr/>
            <h2>Add New Post:</h2>
            <hr />
            <form enctype="multipart/form-data" id="addpost" onSubmit={this.handlePost}>
                <label>Title:</label>
                <input type="text" ref="title" placeholder="title"  />
                <label>Content:</label>

                <textarea className="taOne" ref="content">

                </textarea>


                <br/>
                <label>Tags:</label>
                <input type="text" ref="tags" placeholder="tags (separated by comma)"  />


                <input type="submit" value="POST NEW STATUS" />
                <p className="pee" align="center">
                  {this.state.errorMessage}
                </p>
            </form>
            <hr />
            <h1>All posts by {this.state.postContentBase}</h1>
            <hr />
            {posts}
            </div>

          );

      }


    },

    showLogin: function(e){
        e.preventDefault();
        this.setState({
          step: 1
        })

    },
    showRegister: function(e){

        e.preventDefault();
        this.setState({
          step: 2
        })

    },
    logOut: function(e){

        e.preventDefault();
        this.setState({
          step: 1,
          errorMessage: "Successfully Logged Out",
          _id: "",
          username: ""
        })

    },
    getAllPosts: function(){

         //console.log("getting all posts");
        if (this.context.postType=='user'){
          fetch('/api/posts/user/'+this.state._id)
          .then(function(data){

              return data.json();


          }).then(json => {

                this.setState({
                  errorMessage: "Fetched Posts",
                  posts: json,
                  postContentBase: this.state.username
                });

          });
        } else {
          // fetch posts based on tags
          fetch('/api/posts/tag/'+this.context.postType)
          .then(function(data){

              return data.json();


          }).then(json => {

                this.setState({
                  postContentBase: '#'+this.context.postType,
                  errorMessage: "Fetched Posts for #"+this.context.postType,
                  posts: json
                });
                // fetched posts, now fetching comments one by one for each post

                // to improve performance collect all posts IDs in an array
                /*var arr=json.map(function(elem){
                  return elem._id;
                });

                fetch('/api/comments/'+elem._id)
                .then(function(data){

                    return data.json();


                });
                */
          });
        }

    },

    handleLogin: function(e){
      //var users = this.state.users;

        //console.log("The vaalue : "+ this.refs.name.value);
        e.preventDefault();
        // console.log(e);
        var _username = this.refs.loginUsername.value;
        //var _name = document.getElementById('name01').value;
        //alert(_name);
        var _pwd = this.refs.loginPwd.value;
        //console.log("Picking data: "+_username+_pwd);
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: _username,
            password:_pwd
          })
        })
        .then(function(data){

            return data.json();


        }).then(json => {
          console.log(json.STATUS);
          if(json.user){

              this.setState({

                errorMessage: "Logged In",
                username: json.user.username,
                _id: json.user._id,
                step: 3

              });
              this.getAllPosts();
          }
          else {
            this.setState({
                errorMessage: "Sorry Please Enter Correct Credentials"

            });
          }
        });


    },
    handlePost: function(e){
        e.preventDefault();
        var _title = this.refs.title.value;
        var _content = this.refs.content.value;

        var _tags = this.refs.tags.value;
        var _owner = this.state._id;

        fetch('/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: _title,
            content:_content,
            tagsText: _tags,
            owner: _owner
          })
        })
        .then(function(data){

            return data.json();


        }).then(json => {

          if(json.STATUS) // done
            this.getAllPosts();
            this.callRefreshTags();
            console.log(json);
              this.setState({
                errorMessage: json.MESSAGE
              });

              console.log(json);
        });


    },
    handleRegister: function(e){
        e.preventDefault();
        var _username = this.refs.regUsername.value;
        var _pwd = this.refs.regPwd.value;
        var _email = this.refs.regEmail.value;
        var _gender = this.refs.regGender.value;
        fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: _username,
            password:_pwd,
            email: _email,
            gender: _gender
          })
        })
        .then(function(data){

            return data.json();


        }).then(json => {
          console.log(json.STATUS);
          //if(json.STATUS){ // done
            console.log(json);
              this.setState({
                //users: this.state.users.concat(json),
                errorMessage: json.MESSAGE

                //errorMessage: ""

              });
              console.log(json);
        });
    }

});
Timeline.contextTypes = {
  val: PropTypes.string,
  postType: PropTypes.string
};
