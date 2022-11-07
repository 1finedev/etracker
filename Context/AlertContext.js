import { useCallback, useContext, useState } from "react";
import { createContext } from "react";

let alertId = 0;

export const AlertContext = createContext({
    alerts: [],
    addAlert: () => { },
    removeAlert: () => { },
});

const AlertContextWrapper = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const removeAlert = useCallback((id) => {
        setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
    }, []);

    const addAlert = useCallback((alert) => {
        const newId = alertId;
        alertId++;

        const newAlert = {
            // duration: 4700,
            duration: 8000,
            ...alert,
            id: newId,
        };

        setAlerts((alerts) => [...alerts, newAlert]);
    }, []);

    const AlertData = {
        alerts,
        addAlert,
        removeAlert,
    };

    return (
        <AlertContext.Provider value={AlertData}>{children}</AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);
export default AlertContextWrapper;
