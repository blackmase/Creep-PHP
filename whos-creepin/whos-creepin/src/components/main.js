// =============================
// DEPENDENCIES
// =============================
// packages
import React from "react";
// components
import Form  from "./form.js";
import Post from "./post.js";
// =======Heroku========
let baseUrl = "";
if (process.env.NODE_ENV === "development"){
  baseUrl = "https://creeper-php.herokuapp.com/api"
} else  {
  baseUrl = "https://cors-anywhere.herokuapp.com/https://creeper-php.herokuapp.com/api";
}




class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      posts:[]
    }
  }

  fetchPost = () => {
    fetch(`${baseUrl}/posts`)
    .then(data => data.json())
    .then(jData => {
      this.setState({
        post: jData
      })
    }).catch(err => console.log(err))
  }
  // will run after render () (React lifecycle)
  componentDidMount(){
    this.fetchPost()
  }
  // =======CreateRoute==========
  handleCreate = (createData) => {
    console.log(createData);
    fetch(`${baseUrl}/posts`, {
      body: JSON.stringify(createData),
      method: "POST",
      headers: {
        "Accept" : "application/json, text/plain, */*",
        "Content-Type": "application/json "

      }
    })
    .then(createdPost => {
      return createdPost.json()
    })
    .then(jsonedPost => {
      this.props.handleView('home')
      this.setState(prevState => {
        prevState.posts = jsonedPost
        return{
          posts: prevState.posts
        }
      })
    })
    .catch(err => console.log(err))
  }
  // ============PutRoute===========
  handleUpdate = (updateData) => {
    fetch(`${baseUrl}/posts/${updateData.id}`, {
      body: JSON.stringify(updateData),
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(updatedPost => {
      this.props.handleView("home")
      this.fetchPost()
    })
    .catch(err => console.log(err))
  }
  // =======DeleteRoute===========
  handleDelete = (id) => {
    fetch(`${baseUrl}/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(json => {
      this.setState(prevState => {
        const posts = prevState.posts.filter(post => post.id !== id)
        return{ posts }
      })
    }).catch(err => console.log(err))
  }
  // ==============
  // RENDER
  // ==============

  render(){
    return(
      <main>
      <h1>{this.props.view.pageTitle}</h1>
      {this.props.view.page === "home" ?
      this.state.posts.map((postData) => (
        <Post
        key={postData.id}
        postData={postData}
        handleView={this.props.handleView}
        handleDelete={this.handleDelete}
        />
      ))
      :  <Form
      handleCreate={this.handleCreate}
      formInputs={this.props.formInputs}
      handleUpdate={this.handleUpdate}
      view={this.props.view}
      />
    }
    </main>
  )
}

}


export default Main;
