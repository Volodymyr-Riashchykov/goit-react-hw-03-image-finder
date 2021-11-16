import { Component } from 'react';
import Form from '../Form/Form';
import s from './App.module.css';
import Api from '../../Service/ServiceApi';
import Gallery from '../Gallery/Gallery';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  state = {
    searh: "",
    page: 1,
    error: null,
    isModal: false,
    modal: '',
    images: [],
    isSpin: false,
  }
  async componentDidUpdate(prevProps, { searh, page }) {
        try{
            if (searh !== this.state.searh || page !== this.state.page) {
                
                this.setState({ isSpin: true })
                
                const image = await Api(this.state.searh, this.state.page)
                // 
                this.setState((prevState)=>({ images: [...prevState.images, ...(image)]  }));
                
              if (this.state.images.length > 0) {
                  
                this.setState({ isSpin: false })
                   
                }
                else {
                    
                    this.setState({error: toast.error("Введите другую строку поиска"),})
                }
                if(this.state.page > 1) { window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                    })}
            }
            
        } catch (error) {
            this.setState({ error: toast.error("Woops, something went wrong... Try again later."),})
        } 
    }
  
  handleFormSubmit = (searh) => {
    if (searh!==this.state.searh) {
      this.setState({ images: [], searh: searh, page: 1, error: null })
    }
    else {
      this.setState({ error: toast.error("Строка совпадает с ранее введенной") })
    }
    
  }
  
  handleClick = () => {
    this.setState(prevState => { return {page:prevState.page + 1 }})
  }
  onClickGal = img => {
        this.setState({isModal:true,modal:img.largeImageURL})
  }
  onClose = () => {
    this.setState(({ isModal }) => ({ isModal: !isModal }));
  };
  
  render() {
    const { images, modal, isModal, isSpin } = this.state
    const isBtn = images.length > 0 && !isSpin;
    return (
      <>
        <Form searh={this.handleFormSubmit} />
        
        {images.length > 0 && (<Gallery images={images} onClickGal={this.onClickGal} />)}
        
        {isBtn &&
          <button
            type='button'
            className={s.button}
            onClick={this.handleClick}
          >Load more
          </button>}
        
        {isSpin && <Spinner />}

        {isModal && (<Modal onClose={this.onClose} >
                    {<img src={modal} alt="" />}
          </Modal>)}

        <ToastContainer />
      </>
    )
    
  }
}
