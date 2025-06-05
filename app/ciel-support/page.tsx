import LiveSupportChat from "@/components/ciel-support/LiveSupportChat";

export default function LiveSupportPage() {
  return (
      <div className="absolute flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Ciel Support</h1>
        <p className="text-gray-600 mb-8">
          Connect with our energy experts in real-time. Our team is ready to
          answer your questions about energy efficiency, incentives, or your
          specific project.
        </p>
        <LiveSupportChat />
      </div>
  );
}
