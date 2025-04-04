"use client";

import React from "react";
import { FutureUpgrades } from "@/components/report/FutureUpgrades";
import { PearlCertification } from "@/components/report/PearlCertification";

export const FutureUpgradesAndCertificates: React.FC = () => {
    return (
        <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Future Solutions & Certifications</h2>
            <FutureUpgrades />
            <PearlCertification />
        </div>
    );
}