function AuthSideImage() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between relative overflow-hidden"
      style={{
        background:
          "linear-gradient(154.81deg, #F0F8E6 0%, #D0E8B1 50.4%, #85C435 99.99%)",
        borderRadius: "15px",
      }}
    >
      <img
        src="/CP-2016Logo.png"
        alt="logo"
        className="absolute top-4 left-4 w-24 md:w-32"
      />

      <div className="flex-grow flex items-center justify-center px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-center max-w-md">
          <span className="text-[#495643]">Give your </span>
          <span className="text-[#5ea502] font-semibold">Home</span>
          <span className="text-[#495643]"> the </span>
          <span className="text-[#5ea502] font-semibold">Upgrades</span>
          <span className="text-[#495643]"> it needs.</span>
        </h1>
      </div>

      <div className="w-full h-1/3 relative overflow-hidden">
        {/* Circle 1 */}
        <div
          className="absolute rounded-full border-2 border-white opacity-50"
          style={{
            width: "100vh",
            height: "100vh",
            bottom: "-80vh",
            left: "-50vh",
          }}
        ></div>

        {/* Circle 2 */}
        <div
          className="absolute rounded-full border-2 border-white opacity-50"
          style={{
            width: "100vh",
            height: "100vh",
            bottom: "-85vh",
            left: "-60vh",
          }}
        ></div>
      </div>
    </div>
  );
}

export default AuthSideImage;
