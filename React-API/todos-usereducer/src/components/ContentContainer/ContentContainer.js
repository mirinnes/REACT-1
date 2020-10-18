import React from 'react';
import './ContentContainer.scss'
import illustration from '../../assets/illustrations.png'

const ContentContainer = ({children}) => {
 return(
     <section className="todo-content">
        <section className="content-form">
                {children}
        </section>
        <section className="illustration">
            <img className="img" src={illustration} alt="girl waving while she's doing work"/>
        </section>
    </section>
 )
}

export default ContentContainer;
