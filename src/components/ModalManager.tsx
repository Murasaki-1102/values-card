import React from "react";
import { useModal } from "../hooks/useModal";

export const ModalManager = () => {
  const { state } = useModal();
  if (!state.modalComponent) return null;

  const Modal = state.modalComponent;
  return <Modal {...state.modalProps} />;
};
