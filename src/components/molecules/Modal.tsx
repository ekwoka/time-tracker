import { JSX } from 'solid-js';

import { Beacon } from '@/hooks';

import { classNames } from '@/utils';

export const Modal = (props: ModalProps) => (
  <div
    class={classNames(
      'modal modal-bottom sm:modal-middle',
      props.open() && 'modal-open'
    )}
    onClick={() => props.onClose()}>
    <div
      class="modal-box rounded-none sm:!rounded-2xl"
      onClick={(e) => e.stopPropagation()}>
      {props.children}
    </div>
  </div>
);

type ModalProps = {
  open: Beacon<boolean>;
  onClose: () => void;
  children: JSX.Element[] | JSX.Element;
};
