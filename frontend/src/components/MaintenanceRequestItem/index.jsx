import "./style.css"

function MaintenanceRequestItem ({request, deleteRequest, completeRequest, redirectPage}) {
  return (
    request.status === true
    ? <li className="maintenance-request-item-completed" role="completed-reqest-item">
      {/* <div className="image-container">IMAGE PLACEHOLDER</div> */}
      <div style={{backgroundColor:"red"}}>
      <table className="details-container">
        <tbody>
          <tr>
            <th>Work type </th>
            <td>{request.work_type}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{request.title}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{request.description}</td>
          </tr>
          <tr>
            <th>Cost </th>
            <td>{request.cost ? <span>£ {request.cost}</span> : <span>No cost quoted</span> }</td>
          </tr>
          <tr>
            <th>Created</th>
            <td>{request.created_on}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="request-editor">
        <button
          onClick={() => redirectPage(request)}
        >
          <span>View property</span>
        </button>
        <button 
          aria-label="delete request" 
          className="trash-btn" 
          onClick={() => deleteRequest(request)}>
        <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </li> 

    : <li className="maintenance-request-item" role="open-reqest-item">
      <table className="details-container" role="details-container">
        <tbody>
          <tr>
            <th>Work type </th>
            <td>{request.work_type}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{request.title}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{request.description}</td>
          </tr>
          <tr>
            <th>Cost </th>
            <td>{request.cost ? <span>£ {request.cost}</span> : <span>No cost quoted</span> }</td>
          </tr>
          <tr>
            <th>Created</th>
            <td>{request.created_on}</td>
          </tr>
        </tbody>
      </table>
      <div className="request-editor">
      <button
          className="view-property-button"
          onClick={() => redirectPage(request)}
        >
          <span className="material-symbols-outlined">Home</span>
        </button>
        {/* <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z"/></svg> */}
        <button 
          className="complete-btn" 
          role="complete-btn"
          aria-label="complete request"
          onClick={() => completeRequest(request)}>
        <span className="material-symbols-outlined">done_outline</span>
        </button>
        <button 
          className="trash-btn" 
          role="delete-btn"
          aria-label="delete request"
          onClick={() => deleteRequest(request)}>
        <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </li>
  )
}

export default MaintenanceRequestItem
