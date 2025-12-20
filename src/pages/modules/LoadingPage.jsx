import React, { useState, useEffect } from "react";
import Logo from "../../assets/Technoro.png";

const LoadingPage = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 10;
                } else {
                    clearInterval(interval);
                    return 100;
                }
            });
        }, 500);

        return () => clearInterval(interval); // Cleanup to prevent memory leaks
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#EBF2F1]">
            <img src={Logo} alt="Logo" className="w-[464px]" />
            <div className="w-[464px] h-4 bg-gray-300 rounded-full overflow-hidden mt-4">
                <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LoadingPage;
