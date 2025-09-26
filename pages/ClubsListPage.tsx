import React from "react";
import { useNavigate } from "react-router-dom";
import { Club } from "../types";
import { ClubIcon } from "../components/icons/Icons";

interface ClubCardProps {
    club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
    const navigate = useNavigate();

    const handleViewClub = () => {
        navigate(`/clubs/${club.id}`);
    };

    return (
        <div
            className="bg-surface rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={handleViewClub}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${club.name}`}
            onKeyDown={(e) => e.key === "Enter" && handleViewClub()}
        >
            {/* Image */}
            <div className="aspect-video overflow-hidden bg-muted">
                <img
                    src={club.imageUrl || "/placeholder-club.png"}
                    alt={club.name || "Club image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-text-primary truncate">
                    {club.name || "Unnamed Club"}
                </h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                    {club.description || "No description available."}
                </p>
                <div className="flex items-center text-sm text-text-secondary mt-4">
                    <ClubIcon className="w-4 h-4 mr-2" />
                    <span>{club.memberCount?.toLocaleString() ?? 0} Members</span>
                </div>
            </div>
        </div>
    );
};

export default ClubCard;
