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
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-secondary
                 bg-background hover:bg-secondary transition-colors
                 text-text-secondary hover:text-primary hover:border-primary"
        >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
};
