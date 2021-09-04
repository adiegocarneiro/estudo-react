import { Component } from "react";
import './estilo.css'

export class Button extends Component {
    
    render(){
        const { label, onClick, disabled } = this.props

        return (
            <button 
                disabled = {disabled}
                className='button'
                onClick = { onClick }>

                    {label}
                    
            </button>
        )
    }
}