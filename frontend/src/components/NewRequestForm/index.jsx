import React from 'react'
import { RiCloseLine } from "react-icons/ri"

import styles from "./Modal.module.css";

const NewRequestForm = ({ setIsOpen }) => {




  return (
    <div className='maintenance-request-form'>
      <div className={styles.mrf_darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.mrf_centered}>
          <div className={styles.mrf_modal}>
            <div className={styles.mrf_modalHeader}>
              <h5 className={styles.mrf_heading}>New maintenance request</h5>
            </div>
            <button className={styles.mrf_closeBtn} onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className={styles.mrf_modalContent}>
              
              <form>
                <tbody>
                  <p style={{textAlign: "left"}}>* indicates required fields</p>
                  <tr>
                    <th>
                      <label htmlFor="work-type">Work type *</label>
                    </th>
                    <td>
                      <select id='work-type' required>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <th>
                      <label htmlFor="priority">Priority *</label>
                    </th>
                    <td>
                      <select id='priority' required>
                        <option value="electrical">Electrical</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="gas">Gas</option>
                        <option value="Other">Other</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <th>
                      <label htmlFor="work-title">Title *</label>
                    </th>
                    <td>
                      <input id="work-title" type="text" required />
                    </td>
                  </tr>

                  <tr>
                    <th>
                      <label htmlFor="work-description">Description *</label>
                    </th>
                    <td>
                      <textarea cols={50} rows={5} id="work-description" type="text" required />
                    </td>
                  </tr>

                  {/* <tr>
                    <th>
                    </th>
                    <td>
                    </td>
                  </tr> */}

                  <tr>
                    <th>
                      <label htmlFor="work-location">Location *</label>
                    </th>
                    <td>
                      <input required id="work-location" type="text" />
                    </td>
                  </tr>

                  <tr>
                    <th>
                      <label htmlFor="property-id">Property ID *</label>
                    </th>
                    <td>
                      <input required id="property-id" type="text" />
                    </td>
                  </tr>

                  <tr>
                    <th>
                      <label htmlFor="cost">Cost £</label>
                    </th>
                    <td>
                      <input id="cost" type="number" min="0.00" step="0.01" />
                    </td>
                  </tr>
                </tbody>
                

                
                

                
                
              </form>

            </div>
            <div className={styles.mrf_modalActions}>
              <div className={styles.mrf_actionsContainer}>
                <button 
                  className={styles.mrf_submitBtn} 
                  // onClick={() => setIsOpen(false)}
                >
                  sumbit
                </button>
                <button
                  className={styles.mrf_cancelBtn}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default NewRequestForm
