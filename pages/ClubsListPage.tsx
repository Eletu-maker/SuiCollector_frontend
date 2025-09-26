import React, { useEffect, useState } from "react";
import ClubCard from "../components/ClubCard";
import { Club } from "../types";

const ClubsListPage: React.FC = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace this with your real fetch call
        const fetchClubs = async () => {
            try {
                // Example fetch
                const res = await fetch("/api/clubs");
                const data = await res.json();

                // Make sure it's an array of valid clubs
                const safeClubs = (data || [])
                    .filter((c: any) => c && c.id && c.name);

                setClubs(safeClubs);
            } catch (error) {
                console.error("Failed to fetch clubs", error);
                setClubs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    if (loading) {
        return <div className="p-4">Loading clubs…</div>;
    }

    if (!clubs.length) {
        return <div className="p-4 text-text-secondary">No clubs available.</div>;
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clubs.map((club) => (
                <ClubCard key={club.id} club={club} />
            ))}
        </div>
    );
};

export default ClubsListPage;
