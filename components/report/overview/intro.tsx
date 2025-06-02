import { useEffect, useState } from "react";
import Image from "next/image";

interface ParsedAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export default function IntroSection() {
  const [address, setAddress] = useState<ParsedAddress>({
    street: "123 Main Street",
    city: "ANYTOWN",
    state: "NJ",
    zip: "54321",
  });
  const [auditor, setAuditor] = useState("Ciel Energy Auditor");
  const [auditDate, setAuditDate] = useState("August 1st, 2023");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    try {
      // Get booking data from session storage
      const bookingDataStr = sessionStorage.getItem("bookingData");
      const offeredContractsStr = sessionStorage.getItem("offeredContracts");

      if (bookingDataStr) {
        const bookingData = JSON.parse(bookingDataStr);

        if (bookingData.address) {
          const addressParts = bookingData.address.split(", ");
          if (addressParts.length >= 3) {
            const street = addressParts[0];
            const city = addressParts[1];
            const stateZipPart = addressParts[2];

            const stateZipMatch = stateZipPart.match(
              /^(.+)\s+(\d{5}(?:-\d{4})?)$/
            );
            const state = stateZipMatch ? stateZipMatch[1] : stateZipPart;
            const zip = stateZipMatch ? stateZipMatch[2] : "";

            setAddress({
              street,
              city,
              state,
              zip,
            });
          }
        }

        if (bookingData.title) {
          setCustomerName(bookingData.title);
        }

        // Format creation time as audit date
        if (bookingData.creationTime) {
          const formattedDate = new Date(
            bookingData.creationTime
          ).toLocaleDateString();
          setAuditDate(formattedDate);
        }
      }

      // Get auditor from contracts
      if (offeredContractsStr) {
        const offeredContracts = JSON.parse(offeredContractsStr);
        if (
          offeredContracts.length > 0 &&
          offeredContracts[0].cielPowerRepresentativeRecipient
        ) {
          setAuditor(offeredContracts[0].cielPowerRepresentativeRecipient);
        }
      }
    } catch (error) {
      console.error("Error parsing session storage data:", error);
      // Keep default values if parsing fails
    }
  }, []);

  return (
    <section
      className="bg-white max-h-fit p-2 w-full border-b border-gray-200"
      id="intro-header"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Text content */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8">
            Home Energy
            <br />
            Audit
          </h1>
          <div className="space-y-1 mb-8">
            <p className="text-[#ff6700] text-xl md:text-2xl font-semibold">
              {customerName ? `Report of ${customerName}` : "Sample Report"}
            </p>
            <p className="text-[#ff6700] text-xl md:text-2xl font-semibold">
              {address.street}
            </p>
            <p className="text-[#ff6700] text-xl md:text-2xl font-semibold">
              {address.city}, {address.state} {address.zip}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[#67b502] text-lg md:text-xl">
              Audited by: {auditor}
            </p>
            <p className="text-[#67b502] text-lg md:text-xl">
              Audit Date: {auditDate}
            </p>
          </div>
        </div>
        {/* Right side - Home image */}
        <div className="relative w-full h-[300px] md:h-auto overflow-hidden">
          <Image
            src="/house-report.png"
            alt="Home exterior"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
