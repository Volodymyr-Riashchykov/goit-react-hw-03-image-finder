import { Component } from "react/cjs/react.production.min";
import Api from "../../Service/ServiceApi";
import Gallery from "../Gallery/Gallery";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Info extends Component {
    state = {
        page: 1,
        images: [],
        error: null,
        status: "idle",
        isModal: false,
        modal: '',
    }
    async componentDidUpdate(prevProps, prevState) {
        try{
            if (prevProps.searh !== this.props.searh || prevProps.page !== this.props.page) {
                this.setState({ status: "pending" })
                this.props.handleNoBtn();
                if(prevProps.searh !== this.props.searh) { prevState.images = []; }
                this.setState({ images: [...prevState.images, ...(await Api(this.props.searh, this.props.page))], page: this.props.page, status: "resolve" })
                if (this.state.images.length !== 0) {
                    this.props.handleBtn();
                }
                else {
                    this.setState({status:"reject",error: toast.error("Введите другую строку поиска"),})
                }
                setTimeout(() => {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                    })
                },2000)
            }
            
        } catch (error) {
            this.setState({status:"reject",error: toast.error("Woops, something went wrong... Try again later."),})
        }
    }
    onClickGal = img => {
        this.setState({isModal:true,modal:img.largeImageURL})
    }
    onClose = e => {
        this.setState({isModal:false})
    }

    render() {
        const { status,images,modal,isModal } = this.state
        if (status === "idle") {
            return (
                <div></div>
            )
                }
        
    
        if (status === "pending") {
            return (
                <Spinner />
            )
            }
        if (status === "resolve") {
            return (
                <>
                    <Gallery images={images} onClickGal={this.onClickGal} />
                    {isModal && (
                        <Modal onClose={this.onClose} >
                            {<img src={modal} alt="" />}
                        </Modal>
                    )
                    }
                </>
            );
                }
        if (status === "reject") {
            return (
                <ToastContainer />
            )
                }
        
    }
}