const GoogleTranslate = () => {
  const changeLanguage = (langCode) => {
    
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 text-xs font-medium cursor-pointer">
      <button
        onClick={() => changeLanguage("en")}
        className="hover:text-red-500 transition-colors px-1"
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => changeLanguage("ar")}
        className="hover:text-red-500 transition-colors px-1 font-bold"
      >
        العربية
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => changeLanguage("fr")}
        className="hover:text-red-500 transition-colors px-1"
      >
        FR
      </button>
    </div>
  );
};

export default GoogleTranslate;