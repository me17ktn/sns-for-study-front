import "./ToggleSwitch.css"

const ToggleSwitch = ({ isOpen, setIsOpen }) => {
  return (
    <div className='themeSwitch'>
      <button
      className={`toggleBtn ${isOpen ? "open" : "close"}`}
      onClick={() => setIsOpen(!isOpen)}
      type="button"
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
};

export default ToggleSwitch;