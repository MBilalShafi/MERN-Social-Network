var Navbar = React.createClass({
  getInitialState: function(){

      return({
          // define variables here

      });
  },

  render: function(){
    return(
        <div class="navbar-container">
          <center>
          <div className="row">
            <div className="col-md-2">
              <img src="img/hometext.png" />
            </div>
            <div className="col-md-8">
              <input type="text" name="search" id="searcher" placeholder="enter search query" />
            </div>
            <div className="col-md-2">
              <input type="button" className="mybtn btn btn-primary" value="Go" name="toggle" id="btnOK" />
            </div>
          </div>
          </center>



        </div>

    );
  }
});
