// import logo from './logo.svg';
import { Component } from 'react';
import Form from '../Form/Form';
import Info from '../Info/Info';
import s from './App.module.css';

export default class App extends Component {
  state = {
    searh: "",
    page: 1,
    isBtn: false,
  }
  handleFormSubmit = searh => {
    this.setState({searh: searh,page: 1})
  }
  handleBtn = () => {
    this.setState({ isBtn: true })
  }
  handleNoBtn = () => {
    this.setState({ isBtn: false })
  }
  handleClick = () => {
    this.setState(prevState => { return {page:prevState.page + 1 }})
  }
  render() {
    return (
      <>
        <Form searh={this.handleFormSubmit} />
        <Info searh={this.state.searh} page={this.state.page} handleBtn={this.handleBtn} handleNoBtn={this.handleNoBtn}/>
        {this.state.isBtn &&
          <button
            type='button'
            className={s.button}
            onClick={this.handleClick}
          >Load more</button>}
      </>
    )
    
  }
}
