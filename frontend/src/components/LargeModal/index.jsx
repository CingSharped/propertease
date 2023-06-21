import React from 'react';
import { RiCloseLine } from "react-icons/ri";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

import styles from "./LargeModal.module.css";

const LargeModal = ({ children, setIsOpen }) => {
  return (
    <div className='maintenance-request-form'>
      <div className={styles.modal_darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.modal_centered}>
        <div className={styles.modal_modal}>
        {/* <Box  className={styles.modal_closeBtn}>
            <Button onClick={() => setIsOpen(false)}>x</Button>
          </Box> */}
          <button className={styles.modal_closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={`${styles.modal_modalContent} ${styles.scrollableContent}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LargeModal;
