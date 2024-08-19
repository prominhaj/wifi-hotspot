"use client";

const ServiceButton = ({ children, device, url, mobileUrl }) => {

    const handleRedirect = () => {
        if (device === 'desktop') {
            window.location.href = url;
        } else {
            window.location.href = mobileUrl;
        }
    };

    return (
        <button onClick={handleRedirect}>
            {children}
        </button>
    );
};

export default ServiceButton;