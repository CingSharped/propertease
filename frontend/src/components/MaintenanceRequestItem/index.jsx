import "./style.css"

function MaintenanceRequestItem ({request}) {
  return (
    <li className="maintenance-request-item">
      {/* hello */}
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
      {console.log(request)}
    </li>
  )
}

export default MaintenanceRequestItem
