import React, { useState } from "react";
import "./property.css"

const PropertyCreation = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

const handleNameChange = (e) => {
    setName(e.target.value);
};

const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Description:", description);
    setName("");
    setDescription("");
};

return (
    <div>
      <h2>Create Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default PropertyCreation;
