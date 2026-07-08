import React, { useContext, useState } from "react"; 
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { logoutService } from "../../services/authService";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function MainLayout(props) {
  const { children } = props;
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { theme, isDarkMode, setIsDarkMode, setTheme } = useContext(ThemeContext);

  const colorThemes = [
  { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
  { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
  { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
  { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
  { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
];

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction", },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];
  
  const { user, logout } = useContext(AuthContext);

	  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutService();
      logout(); 
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        logout();
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoggingOut}
      >
        <CircularProgress color="inherit" />
        <div className="ml-3 text-white">Logging Out</div>
      </Backdrop>
	    <div className={`flex min-h-screen ${theme.name} transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-special-mainBg'}`}>
			<aside className={`w-28 sm:w-64 flex flex-col justify-between px-7 py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-defaultBlack text-special-bg2'}`}>
        		<div>
              <div className="mb-10">
                <Logo variant="secondary" />
              </div>
									<nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
									className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }               
                   >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
		</div>
    					<div>
            Themes
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              {colorThemes.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer mb-2`}
                  onClick={() => setTheme({ name: t.name, color: t.color })}
                ></div>
              ))}
            </div>
          </div>
		<div>
      <div onClick={handleLogout} className="cursor-pointer">
      							<div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md">
                <div className="mx-auto sm:mx-0 text-primary">
                  <Icon.Logout/>
                </div>
                <div className="ms-3 hidden sm:block">Logout</div>
              </div>
              </div>
     						<div className="flex justify-between items-center">
              <div>Avatar</div>
              <div className="hidden sm:block">
               <div>{user.name}</div>
                <div>View Profile</div>
              </div>
              <div className="hidden sm:block">
                <Icon.Detail size={15}/></div>
            </div>
		</div>
    </aside>
			<div className={`flex-1 flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-special-mainBg'}`}>
       			<header className={`border border-b px-6 py-7 flex justify-between items-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-special-mainBg border-gray-05'}`}>
            <div className="flex items-center">
        <div className={`font-bold text-2xl me-6 ${isDarkMode ? 'text-white' : ''}`}>{user.name}</div> 
			  <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-03'}`}>
          <Icon.ChevronRight size={20}/>
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-03'}>may 19, 2023</span>
           </div> 
      </div>
			<div className="flex items-center gap-4">
        {/* Toggle dark/light mode */}
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
        >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
        <div className="me-10">
          <NotificationsIcon className={`scale-110 ${isDarkMode ? 'text-gray-300' : 'text-primary'}`}/>
          </div> 
			  <Input 
          backgroundColor={isDarkMode ? "bg-gray-700" : "bg-white"} 
          border={isDarkMode ? "border-gray-600" : "border-white"} 
          color={isDarkMode ? "text-white" : "text-black"}
        />
      </div>
            </header>
			<main className="flex-1 px-6 py-4">{children}</main>
      </div>
		</div>
    </>
  );
}

export default MainLayout;