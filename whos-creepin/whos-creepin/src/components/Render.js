import React, { Component } from 'react';

class Creeper extends Component {
  render () {
    return  (
      <div>
        <h1>Name: {this.props.description.fullName}</h1>
        <img src={this.props.description.avatar} alt={this.props.avatar}/>
        <h2>Location: {this.props.description.location}</h2>
        <h3>Gender: {this.props.description.gender}</h3>
        <h4>ageRange: {this.props.description.ageRange}</h4>
      </div>
    )
  }
}

export default Creeper;
