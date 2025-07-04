import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

function Form() {
  const [formData, setFormData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: null,
  });

  // Handle change for text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, selectedFile: e.target.files[0] });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData for file upload
    const data = new FormData();
    data.append("creator", formData.creator);
    data.append("title", formData.title);
    data.append("message", formData.message);
    data.append("tags", formData.tags);
    data.append("selectedFile", formData.selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/post/", data);
      console.log("Success:", response.data);
      setFormData({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: null,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Form_Container">
      <h3>Creating a Memory</h3>
      <form className="form_fields" onSubmit={handleSubmit}>
        <div className="input_field">
          <input
            type="text"
            name="creator"
            value={formData.creator}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Creator</label>
        </div>

        <div className="input_field">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Title</label>
        </div>

        <div className="input_field">
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Message</label>
        </div>

        <div className="input_field">
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Tags</label>
        </div>

        <div className="input_field">
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="input_field">
          <button type="submit" className="btn Submit_btn">
            Submit
          </button>
          <button
            type="button"
            className="btn Cancel_btn"
            onClick={() =>
              setFormData({
                creator: "",
                title: "",
                message: "",
                tags: "",
                selectedFile: null,
              })
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
