import "./style.css"

function MaintenanceRequestItem ({request}) {
  return (
    request.completed 
    ? <li className="maintenance-request-item-completed" role="completed task">
      <div className="image-container">IMAGE PLACEHOLDER</div>
      <table className="details-container">
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
      </table>
      <div className="request-editor">
        hello
      </div>
    </li> 
    : <li className="maintenance-request-item" role="open task">
      <div className="image-container">IMAGE PLACEHOLDER</div>
      <table>
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
      </table>
    </li>
  )
}

export default MaintenanceRequestItem
