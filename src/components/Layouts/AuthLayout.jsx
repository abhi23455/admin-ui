import React, { useContext } from 'react';
import Logo from '../Elements/Logo';
import { ThemeContext } from '../../context/themeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function AuthLayout(props) {
    const { children } = props;
    const { theme, isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  return (
    <>
        <main 
        className={`min-h-screen flex justify-center items-center transition-colors duration-300 ${theme.name} ${isDarkMode ? 'bg-gray-900' : 'bg-special-mainBg'}`}>
            {/* container start */}
            <div className="w-full max-w-sm">
                <Logo />
                {children}
                {/* Toggle dark/light mode */}
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-3 rounded-full transition-all ${isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </button>
                </div>
            </div>
            {/* container end */}
        </main>
    </>
  )
}

export default AuthLayout