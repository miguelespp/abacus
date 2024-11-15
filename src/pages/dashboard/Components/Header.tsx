const Header = () => {
  return (
    <header className="bg-cyan-700 mt-4 py-4 px-6 flex justify-between rounded-2xl mx-6">
      <h1
        className="text-white"
        style={{
          fontFamily: "'Merriweather', serif",
          fontOpticalSizing: "auto",
          fontWeight: 700,
          fontStyle: "normal",
        }}
      >
        ABACUS
      </h1>
      <h2>Perfil</h2>
    </header>
  );
};

export default Header;
