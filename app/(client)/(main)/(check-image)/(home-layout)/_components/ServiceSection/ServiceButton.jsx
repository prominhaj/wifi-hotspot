"use client";

const ServiceButton = ({ children, mobileUrl }) => {

    const handleRedirect = () => {
        window.location.href = mobileUrl;
    };

    return (
        <button onClick={handleRedirect}>
            {children}
        </button>
    );
};

export default ServiceButton;