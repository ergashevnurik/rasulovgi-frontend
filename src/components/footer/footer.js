import React from "react";
import "./footer.css";

const Footer  = () => {
    return(
        <div className="main-footer">
            <div className="container">
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} THICC MEMES INC | All right resevred | Terms Of Serivce | Privacy 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;