import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CharAvatar from "../Cards/CharAvatar";
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleClick = (route) => {
    // Guard clause for invalid routes
    if (!route) {
      console.warn("Invalid route provided");
      return;
    }

    if (route === "logout") {
      handleLogout();
      return;
    }

    try {
      navigate(route);
    } catch (error) {
      console.error("Navigation error:", error);
      // Optionally show user-friendly error message
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent double-clicking

    setIsLoggingOut(true);

    try {
      // Remove specific localStorage items instead of clearing everything
      const keysToRemove = [
        "authToken",
        "refreshToken",
        "userData",
        "userPreferences",
      ];

      keysToRemove.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.warn(`Failed to remove ${key} from localStorage:`, error);
        }
      });

      // Clear user context
      if (clearUser && typeof clearUser === "function") {
        clearUser();
      }

      // Navigate to login
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);

      // Still try to clear user and navigate even if localStorage fails
      if (clearUser && typeof clearUser === "function") {
        clearUser();
      }
      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle missing context
  if (!user && !clearUser) {
    console.error("UserContext not available");
    return (
      <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Unable to load user data</p>
        </div>
      </div>
    );
  }

  // Handle missing menu data
  if (!SIDE_MENU_DATA || !Array.isArray(SIDE_MENU_DATA)) {
    console.error("SIDE_MENU_DATA is not available or not an array");
    return (
      <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Menu data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* User Profile Section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {!user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={`${user?.fullName || "User"} profile`}
            className="w-20 h-20 bg-slate-400 rounded-full object-cover border-2 border-gray-200"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium leading-6 text-center max-w-full truncate">
          {user?.fullName || "Guest User"}
        </h5>

        {user?.email && (
          <p className="text-sm text-gray-500 text-center max-w-full truncate">
            {user.email}
          </p>
        )}
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {SIDE_MENU_DATA.map((item, index) => {
          // Validate menu item structure
          if (!item || typeof item !== "object") {
            console.warn(`Invalid menu item at index ${index}:`, item);
            return null;
          }

          const { label, path, icon: IconComponent } = item;

          if (!label || !path) {
            console.warn(
              `Menu item missing required fields at index ${index}:`,
              item
            );
            return null;
          }

          const isActive = activeMenu === label;
          const isLogout = path === "logout";

          return (
            <button
              key={`menu_${index}_${label}`}
              className={`
                w-full flex items-center gap-4 text-[15px] font-medium
                py-3 px-6 rounded-lg transition-all duration-200 ease-in-out
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                ${
                  isActive
                    ? "text-white bg-blue-600 shadow-md hover:bg-blue-700"
                    : "text-gray-700 hover:text-gray-900"
                }
                ${
                  isLogout && isLoggingOut
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              `}
              onClick={() => handleClick(path)}
              disabled={isLogout && isLoggingOut}
              aria-label={`Navigate to ${label}`}
            >
              {IconComponent && (
                <IconComponent
                  className={`text-xl flex-shrink-0 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                  aria-hidden="true"
                />
              )}

              <span className="truncate">
                {isLogout && isLoggingOut ? "Logging out..." : label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// PropTypes for better development experience
SideMenu.propTypes = {
  activeMenu: PropTypes.string,
};

SideMenu.defaultProps = {
  activeMenu: "",
};

export default SideMenu;
