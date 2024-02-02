import ModalOverlay from "../ModalOverlay";
import { motion } from "framer-motion";

const Modal = ({ onClose, isVisible, children }) => {
  if (!isVisible) return;
  return (
    <ModalOverlay action={onClose}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "430px",
          }}
        >
          {children}
        </div>
      </motion.div>
    </ModalOverlay>
  );
};

export default Modal;
