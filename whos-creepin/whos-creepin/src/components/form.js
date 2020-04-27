// =============================
// DEPENDENCIES
// =============================
// packages
import React from 'react'

// =============================
// COMPONENT CLASS
// =============================
class Form extends React.Component {
  // ==============
  // STATE
  // ==============
  constructor() {
    super()
    this.state = {
      name: '',
      info: '',
      comment: '',
      id: null
    }
  }

  // ==============
  // HANDLERS
  // ==============
  // handles form change
  handleChange = (e) => {
    this.setState({[e.target.id] : e.target.value})
  }

  // handles submit
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.view.page === 'addPost') {
      this.props.handleCreate(this.state)
    } else if(this.props.view.page === 'editPost') {

      this.props.handleUpdate(this.state)
    }
  }

  componentDidMount(){
    this.setState({
      name: this.props.formInputs.name,
      info: this.props.formInputs.info,
      comment: this.props.formInputs.comment,
      id: this.props.formInputs.id
    })
  }

  // ==============
  // RENDER
  // ==============
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          name
          <input type="text" placeholder="your name" id="name" value={this.state.name} onChange={this.handleChange}/>
        </label>
        <label>
          Enter creeper info
          <input type="text" placeholder="their info" id="info" value={this.state.info} onChange={this.handleChange}/>
        </label>
        <label id="post-form">
          Explain the creepers message
          <textarea placeholder="write your words" id="comment" value={this.state.comment} onChange={this.handleChange}></textarea>
        </label>
        <input type="submit" value="share"/>
      </form>
    )
  }
}

// =============================
// EXPORT
// =============================
export default Form
