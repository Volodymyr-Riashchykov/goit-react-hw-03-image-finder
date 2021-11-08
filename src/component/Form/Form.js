import React, { Component } from "react"
import s from "./Form.module.css"
import Button from "../Button/Button"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Form extends Component {
    state = {
        searh: "",
        error: null,
    }
    handleSearh = e => {
        e.preventDefault();
        if (this.state.searh.trim() === "") {
            this.setState({error: toast.error("Пустая строка"),})
            return
        }
        this.props.searh(this.state.searh)
        this.setState({searh:""})
    }
    handleSearhReq = e => {
        this.setState({searh: e.currentTarget.value.toLowerCase()})
    }
    render() {
        return (
            <header className={s.header}>
                < form onSubmit = { this.handleSearh } className={s.form}>
                    <Button />
                    
                    <label className={s.label}>
                        <input
                            className={s.input}
                            type = "text"
                            placeholder="Search images and photos"
                            value = {this.state.searh}
                            onChange = {this.handleSearhReq}
                        />
                    </label>
                     <ToastContainer />
                </form>
            </header>
        )
    }}