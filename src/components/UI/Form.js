import "./Form.css";
import { Tray, Submit, Cancel } from "./Actions";

export default function Form({ children, onSubmit, oncancel }) {
  // Initialisation -----------------------------
  // Hooks -------------------------------------
  // State --------------------------------------
  // Context ------------------------------------
  // Handlers -----------------------------------
  const handleSubmit = () => {
    //console.log("Form - handleSubmit");
    onSubmit();
  };
  const handleCancel = () => {
    oncancel();
  };
  // View ---------------------------------------
  return (
    <div className="BorderedForm">
      <div className="FormTray">{children}</div>
      <Tray>
        <Submit showText onClick={handleSubmit} buttonText="Submit" />
        <Cancel showText onClick={handleCancel} buttonText="Cancel" />
      </Tray>
    </div>
  );
}

function Item({ children, label, htmlFor, advice, error }) {
  // Properties
  // Hooks
  // Context
  // Methods
  // View
  return (
    <div className="FormItem">
      <label className="FormLabel" htmlFor={htmlFor}>
        {label}
      </label>
      {advice && <p className="FormAdvice">{advice}</p>}
      {children}
      {error && <p className="FormError">{error}</p>}
    </div>
  );
}

// Compose Form Object
Form.Item = Item;
