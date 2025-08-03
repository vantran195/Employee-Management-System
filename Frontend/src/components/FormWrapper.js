import React from 'react';

const FormWrapper = ({ children, title }) => {
    return (
        <div className="container-right">
            
            <form className="form">
                <p className="login-title">{title}</p>
                <div className="form-value">
                    {children}
                </div>
            </form>
        </div>
    );
};

export default FormWrapper;