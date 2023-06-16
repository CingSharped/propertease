import React from 'react'
import { RiCloseLine } from "react-icons/ri"

import styles from "./LargeModal.module.css";

const LargeModal = ({ children, setIsOpen }) => {
  return (
    <div className='maintenance-request-form'>
      <div className={styles.modal_darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.modal_centered}>
          <div className={styles.modal_modal}>
            <button className={styles.modal_closeBtn} onClick={() => setIsOpen(false)}>
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

export default LargeModal
