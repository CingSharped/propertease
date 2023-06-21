import "./style.css"

function MaintenanceRequestItem ({request, deleteRequest, completeRequest}) {
  return (
    request.status === true
    ? <li className="maintenance-request-item-completed" role="completed-reqest-item">
      {/* <div className="image-container">IMAGE PLACEHOLDER</div> */}
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
      <div className="request-editor">
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
