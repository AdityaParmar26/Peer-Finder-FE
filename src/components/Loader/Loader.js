import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './Loader.css'

const Load = () => {

    return (
        <div className="loader">
            <Loader
                type="Bars"
                color="#343434"
                height={40}
                width={40}
            />
            <h4 style={{color : "#343434"}}>Loading...</h4>
        </div>
    );
};

export default Load;