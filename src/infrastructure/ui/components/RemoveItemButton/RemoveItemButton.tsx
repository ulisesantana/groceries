import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Id, Item } from "../../../../domain";
import { messages } from "../../../../messages";
import "../../styles/custom-confirm-ui.scss";
import "./RemoveItemButton.scss";

interface RemoveItemButtonProps {
  item: Item;
  removeItemUseCase(id: Id): void;
}

export function RemoveItemButton({
  item,
  removeItemUseCase,
}: RemoveItemButtonProps) {
  const action = () => {
    removeItemUseCase(item.id);
    window.history.back();
  };
  const onClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        const onConfirm = () => {
          action();
          onClose();
        };
        return (
          <div className="custom-confirm-alert">
            <h1>{messages.removeItemButton.cta}</h1>
            <p>{messages.removeItemButton.dialogText}</p>
            <div className="cta-container">
              <button className="confirm" onClick={onConfirm}>
                {messages.removeItemButton.confirm}
              </button>
              <button className="cancel" onClick={onClose}>
                {messages.removeItemButton.cancel}
              </button>
            </div>
          </div>
        );
      },
    });
  };
  return (
    <button
      className="RemoveItemButton"
      onClick={onClick}
      aria-label={messages.removeItemButton.cta}
    >
      {messages.removeItemButton.cta}
    </button>
  );
}
