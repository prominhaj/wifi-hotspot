"use client";

const ServiceButton = ({ children, device }) => {

    const serviceItems = [
        {
            url: "https://www.youtube.com",
            mobileUrl: "youtube://www.youtube.com",
            name: "YouTube",
            icon: "youtube",
        }
    ]

    const handleRedirect = (url, mobileUrl) => {
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