import React, { useEffect, useState } from "react";
import { createPost, updatePost } from "../../services/api";
import "./Form.css";

function Form({ currentPost, setRefresh, setCurrentPost }) {
  const [formData, setFormData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: null,
  });

  useEffect(() => {
    if (currentPost) {
       console.log("Form will populate with:", currentPost);
      setFormData({
        creator: currentPost.creator || "",
        title: currentPost.title || "",
        message: currentPost.message || "",
        tags: currentPost.tags?.join(",") || "",
        selectedFile: null, // image file won't be preloaded
      });
    }
  }, [currentPost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, selectedFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("creator", formData.creator);
    data.append("title", formData.title);
    data.append("message", formData.message);
    data.append("tags", formData.tags);
    if (formData.selectedFile) {
      data.append("selectedFile", formData.selectedFile);
    }

    try {
      if (currentPost?._id) {
        await updatePost(currentPost._id, data); 
      } else {
        await createPost(data); // ✨ create
      }

      setRefresh((prev) => !prev); // reload posts
      setFormData({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: null,
      });
      setCurrentPost(null); // reset edit mode
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <div className="Form_Container">
      <h3>{currentPost ? "Editing" : "Creating"} a Memory</h3>
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
            {currentPost ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            className="btn Cancel_btn"
            onClick={() => {
              setFormData({
                creator: "",
                title: "",
                message: "",
                tags: "",
                selectedFile: null,
              });
              setCurrentPost(null);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
