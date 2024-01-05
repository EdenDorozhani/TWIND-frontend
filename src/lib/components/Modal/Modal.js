import ModalOverlay from "../ModalOverlay";

const Modal = ({ onClose, isVisible, children }) => {
  if (!isVisible) return;
  return (
    <ModalOverlay action={onClose}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "430px",
        }}
      >
        {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;
