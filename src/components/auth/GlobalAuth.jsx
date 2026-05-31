import { useAuthModal } from "../context/AuthModalContext";
import VerifyModal from "./verifyEmailModal";
import AuthModal from "./AuthModal";

export default function GlobalModal() {
  const { isOpen, modalType, payload, closeModal } = useAuthModal();

  if (!isOpen) return null;

  if (modalType === "auth") {
    return <AuthModal onClose={closeModal} />;
  }

  if (modalType === "verify") {
    return <VerifyModal onClose={closeModal} payload={payload} />;
  }

  return null;
}