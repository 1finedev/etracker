import { useAlert } from "../../Context/AlertContext";
import Alert from "../Alert";

const Alerts = () => {
  const { alerts, removeAlert } = useAlert();

  return (
    <div className="fixed bottom-8 left-1/2 z-[20000] w-fit flex flex-col-reverse gap-y-2 transition-all duration-300">
      {alerts.map((alert) => {
        return (
          <Alert
            key={alert.id}
            label={alert.label}
            intent={alert.intent}
            close={() => removeAlert(alert.id)}
            duration={alert.duration}
          />
        );
      })}
    </div>
  );
};

export default Alerts;
