import React from 'react';
import './App.css';
import Header from "./components/header.js";
import Aside from "./components/aside.js";
import Main from "./components/main.js";
import Creeper from "./components/Render.js";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      baseUrl: 'https://api.fullcontact.com/v3/person.enrich',
      method: 'POST',
          headers: {
              "Authorization": "Bearer GFn587apy8rtqECVwVzyHFXGceGfWFrW"
          },
      view: {
        page: 'home',
        pageTitle: 'Creepin'
      },
      formInputs: {
        name: null,
        info: null,
        comment: null,
        id: null
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit (event)  {
    event.preventDefault()
    this.setState({
      searchURL: this.state.baseURL + this.state.phone  +  this.state.email
    }, () => {
      fetch('https://api.fullcontact.com/v3/person.enrich',{
        method: 'POST',
        headers: {
          "Authorization": "Bearer GFn587apy8rtqECVwVzyHFXGceGfWFrW",
          
        },
        body: JSON.stringify({
          "phone*": this.state.phone,
          "email": this.state.email,
          "twitter": this.state.twitter,
          "fullName": this.state.fullName,
          "gender": this.state.gender,
          "avatar": this.state.avatar,

        })
      }).then(function(res) {
        return res.json();
      }).then(json => {
            this.setState({
          description: json,

        })
      }
    )
  })
}

  handleView = (view, postData) => {
    let pageTitle= '';
    let formInputs = {
      name: '',
      info: '',
      comment: '',
      id: null
    }
    switch(view) {
      case 'home':
      pageTitle = 'Creepin'
      break
      case 'addPost':
      pageTitle = 'Tell me about a Creeper'
      break
      case 'editPost':
      pageTitle = 'Edit this creeper email'
      formInputs = {
        name: postData.name,
        info: postData.info,
        comment: postData.comment,
        id: postData.id
      }
      break
      default:
      break
    }
    this.setState({
      view: {
        page: view,
        pageTitle: pageTitle
      },
      formInputs: formInputs
    })
  }
  render() {
    return (
      <div>
      <Header/>
      <Aside handleView={this.handleView}/>
      <Main
      handleView={this.handleView}
      view={this.state.view}
      formInputs={this.state.formInputs}/>
      <React.Fragment>
      <form method="POST" onSubmit={this.handleSubmit}>
      <label htmlFor='email'>email</label>
      <input placeholder='type the creeps email here' id='email'type='text'
      value={this.state.email}
      onChange={this.handleChange}
      />
      <input
      type='submit'
      value='Find Creeper email'
      />
      </form>

      {(this.state.description)
        ? <Creeper description={this.state.description} />
        : ''
      }     </React.Fragment>
      </div>

    )
  }

}

export default App;
