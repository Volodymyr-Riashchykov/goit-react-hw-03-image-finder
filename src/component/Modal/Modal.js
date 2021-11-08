import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const { overlay, modal } = s;
const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
      window.addEventListener("keydown", this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.code === "Escape" || e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

    handleBackdropClick = (e) => {
    //   console.log('www',e)
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
    render() {
        return createPortal(
            <div className={overlay} onClick={this.handleBackdropClick}>
                <div className={modal}>{this.props.children}</div>
            </div>,
            modalRoot,
        );
    }

}
