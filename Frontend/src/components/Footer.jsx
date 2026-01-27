import React from "react";

const Footer = () => {
    return (
        <footer style={{
            marginTop: "60px",
            padding: "20px",
            textAlign: "center",
            opacity: 0.6,
            fontSize: "0.9rem"
        }}>
            © {new Date().getFullYear()} Skyvera.  All rights reserved.
        </footer>
    );
};

export default Footer;
