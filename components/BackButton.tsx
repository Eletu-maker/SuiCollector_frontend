import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ label = "Back" }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="fixed top-24 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full border border-secondary
                 bg-background/80 backdrop-blur-md shadow-md
                 text-text-secondary hover:text-primary hover:border-primary transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
};
