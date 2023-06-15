import "./style.css"

function MaintenanceRequestItem ({request, deleteRequest, completeRequest}) {
  return (
    request.completed 
    ? <li className="maintenance-request-item-completed" role="reqest-item">
      <div className="image-container">IMAGE PLACEHOLDER</div>
      <table className="details-container">
        <tbody>
          <tr>
            <th>Issue</th>
            <td>{request.issue}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>{request.location}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{request.description}</td>
          </tr>
        </tbody>
      </table>
      <div className="request-editor">
        <button 
          aria-label="delete request" 
          className="trash-btn" 
          onClick={() => deleteRequest(request)}>
        <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </li> 

    : <li className="maintenance-request-item" role="reqest-item">
      <div className="image-container">IMAGE PLACEHOLDER</div>
      <table className="details-container">
        <tbody>
          <tr>
            <th>Issue</th>
            <td>{request.issue}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>{request.location}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{request.description}</td>
          </tr>
        </tbody>
      </table>
      <div className="request-editor">
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
