import React from 'react'
import { RiCloseLine } from "react-icons/ri"

import styles from "./Modal.module.css";

const Modal = ({ children, setIsOpen }) => {
  return (
    <div className='modal-container' role='modal-container'>
      <div className={styles.modal_darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.modal_centered}>
          <div className={styles.modal_modal}>
            <button className={styles.modal_closeBtn} role="close-modal" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className={styles.modal_modalContent}>
              {children}
            </div>
          </div>
      </div>
    </div>
  );
}

export default Modal
