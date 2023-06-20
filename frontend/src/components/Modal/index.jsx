import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

import styles from "./Modal.module.css";

const Modal = ({ children, setIsOpen }) => {
  return (
    <div className="maintenance-request-form">
      <div onClick={() => setIsOpen(false)} />
      <div className={styles.modal_centered}>
        <div className={styles.modal_modal}>
          <Box  className={styles.modal_closeBtn}>
            <Button variant="contained" onClick={() => setIsOpen(false)}>x</Button>
          </Box>
          {/* <button className={styles.modal_closeBtn} role="close-modal" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button> */}
          <div className={styles.modal_modalContent}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
