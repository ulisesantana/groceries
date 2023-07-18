import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Id, Item } from "../../../../domain";
import { messages } from "../../../../messages";
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
        return (
          <div className="custom-ui">
            <h1>{messages.removeItemButton.cta}</h1>
            <p>{messages.removeItemButton.dialogText}</p>
            <button
              onClick={() => {
                action();
                onClose();
              }}
            >
              {messages.removeItemButton.confirm}
            </button>
            <button onClick={onClose}>
              {messages.removeItemButton.cancel}
            </button>
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
