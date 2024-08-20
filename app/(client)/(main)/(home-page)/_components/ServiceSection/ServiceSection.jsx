import { getDevice } from "@/lib/hash";
import ServiceButton from "./ServiceButton";

const ServiceSection = () => {
    const device = getDevice();

    return (
        <div className="grid grid-cols-4 gap-4 mt-4 text-center">
            <ServiceButton
                device={device}
                url="https://www.google.com"
                mobileUrl="https://www.google.com"
            >
                <GlobeIcon className="w-8 h-8 mx-auto text-orange-500" />
                <h4 className="mt-1 text-sm">Internet</h4>
            </ServiceButton>
            <ServiceButton
                device={device}
                url="https://www.youtube.com"
                mobileUrl="vnd.youtube://"
            >
                <YouTubeIcon className="w-8 h-8 mx-auto text-red-500" />
                <h4 className="mt-1 text-sm">YouTube</h4>
            </ServiceButton>
            <ServiceButton
                device={device}
                url="https://www.facebook.com"
                mobileUrl="fb://"
            >
                <FacebookIcon className="w-8 h-8 mx-auto text-blue-500" />
                <div className="mt-1 text-sm">Facebook</div>
            </ServiceButton>
            <ServiceButton
                device={device}
                url="https://www.tiktok.com"
                mobileUrl="tiktok://"
            >
                <TikTokIcon className="w-8 h-8 mx-auto text-black dark:text-white" />
                <div className="mt-1 text-sm">TikTok</div>
            </ServiceButton>
        </div>
    );
};

function GlobeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
        </svg>
    )
}

function YouTubeIcon(props) {
    return (
        <svg
            {...props}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 576 512"
            height="200px"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
        </svg>
    )
}

function FacebookIcon(props) {
    return (
        <svg
            {...props}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="200px"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
        </svg>
    )
}

function TikTokIcon(props) {
    return (
        <svg
            {...props}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            fillRule="evenodd"
            height="200px"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M800 112.962C800 50.575 749.425 0 687.038 0H112.962C50.575 0 0 50.575 0 112.962v574.076C0 749.426 50.575 800 112.962 800h574.076C749.425 800 800 749.426 800 687.038zM662.759 348.916c-51.615.577-99.71-15.027-141.938-43.927v202.874c0 90.166-61.72 167.62-148.996 187.848-119.068 27.165-219.864-58.954-232.577-161.835-13.294-102.884 52.322-193.051 152.892-213.281 19.651-4.045 49.209-4.045 64.458-.577v108.661c-4.692-1.153-9.086-2.31-13.709-2.888-39.304-6.937-77.371 12.715-92.977 48.55-15.605 35.838-5.16 77.451 26.629 101.73 26.586 20.806 56.085 23.694 86.14 9.822 30.057-13.291 46.21-37.567 49.676-70.512.578-4.622.546-9.826.546-15.028V110.206c0-10.981.086-10.502 11.068-10.502h86.12c6.36 0 8.673.915 9.25 8.433 4.621 67.047 55.526 124.147 120.838 132.818 6.937 1.155 14.369 1.613 22.58 2.19z" transform="translate(112 112)"></path>
        </svg>

    )
}

export default ServiceSection;
