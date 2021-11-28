import { useTheme } from 'next-themes';

const ToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const handleChangeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <label htmlFor="toggleB" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          onClick={handleChangeTheme}
          type="checkbox"
          id="toggleB"
          className="sr-only"
        />
        <div
          className={`
				${theme === 'dark' ? 'bg-bg-dark-layer2' : 'bg-primary'}
				block w-10 h-6 rounded-full`}
        ></div>
        <div
          className={`${
            theme === 'dark' ? 'translate-x-full bg-primary ' : 'bg-white'
          } absolute left-1 top-1  w-4 h-4 rounded-full transition`}
        ></div>
      </div>
    </label>
  );
};
export default ToggleButton;
