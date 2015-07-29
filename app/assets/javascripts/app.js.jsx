var ready = function() {
  var AlbumBox = React.createClass({
    handleSorted: function(newAlbums) {
      if (!this.isMounted()) return;

      this.setState({ albums: newAlbums });
    },
    getInitialState: function() {
      return { albums: [] }
    },
    componentDidMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: "json",
        success: function(data) {
          this.setState({ albums: data });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    render: function() {
      return (
        <div id="home">
          <Control albums={ this.state.albums } onSorted={ this.handleSorted } />
          <CardList albums={ this.state.albums } />
        </div>
      );
    }
  });

  var Control = React.createClass({
    sortAlbums: function(order) {
      this.props.albums.sort(function(x, y) {
        if (x.title < y.title) {
          return -1 * order;
        } else if(x.title > y.title) {
          return 1 * order;
        }

        return 0;
      });

      this.props.onSorted(this.props.albums);
    },
    render: function() {
      return (
        <div id="control">
          <button className="btn btn-primary"
            onClick={ this.sortAlbums.bind(null, 1) }>
            Ascending
          </button>
          <button className="btn btn-primary pull-right"
            onClick={ this.sortAlbums.bind(null, -1) }>
            Descending
          </button>
        </div>
      );
    }
  });

  var CardList = React.createClass({
    render: function() {
      var cardNodes = this.props.albums.map(function(album) {
        return <Card album={ album } />;
      });

      return (<div id="card-container">{ cardNodes }</div>);
    }
  });

  var Card = React.createClass({
    render: function() {
      var style = { background: "url(" + this.props.album.image + ")" };
      return (
        <div className="card" style={ style }>
          <h3>{ this.props.album.title }</h3>
        </div>
      );
    }
  });

  React.render(<AlbumBox url="/albums" />, document.getElementById("main"));
}

$(document).on("ready", ready)
