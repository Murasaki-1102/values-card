import { VFC, useCallback } from "react";
import { atom, useRecoilState } from "recoil";

type ModalState = {
  modalComponent: VFC<any> | null;
  modalProps?: any;
};

const modalState = atom<ModalState>({
  key: "modalState",
  default: {
    modalComponent: null,
    modalProps: {},
  },
});

export const useModal = () => {
  const [state, setState] = useRecoilState(modalState);

  const openModal = useCallback<
    <T>(modalComponent: VFC<T>, modalProps?: T) => void
  >(<T>(modalComponent: VFC<T>, modalProps?: T) => {
    setState({
      modalComponent,
      modalProps,
    });
  }, []);

  const closeModal = useCallback(() => {
    setState({
      modalComponent: null,
      modalProps: {},
    });
  }, []);

  return {
    state,
    openModal,
    closeModal,
  };
};
