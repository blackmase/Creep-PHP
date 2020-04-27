import React from 'react'

class Aside extends React.Component {
  render() {
    return(
      <aside>
        <h1>Explore</h1>
        <div className="navBar">
          <div onClick={
            ()=>{this.props.handleView('home')}
          }>Go Home</div>
          <div onClick={
            ()=>{this.props.handleView('addPost')
          }
        }>Add Creep</div>
        </div>
      </aside>
    )
  }
}

export default Aside
