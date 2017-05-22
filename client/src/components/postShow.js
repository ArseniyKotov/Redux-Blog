import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.post){
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link className="btn btn-primary" to="/">Back to Index</Link> 
            <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="h3">{post.title}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h6 className="h6">Categories: {post.categories}</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="blockquote">{post.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);