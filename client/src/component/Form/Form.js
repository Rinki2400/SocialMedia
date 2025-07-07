import React, { useEffect, useState } from "react";
import { createPost, updatePost } from "../../services/api";
import "./Form.css";

function Form({ currentPost, setRefresh, setCurrentPost, onSearch }) {
  const initialState = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: null,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (currentPost) {
      setFormData({
        creator: currentPost.creator || "",
        title: currentPost.title || "",
        message: currentPost.message || "",
        tags: currentPost.tags?.join(",") || "",
        selectedFile: null,
      });
    }
  }, [currentPost]);

  const resetForm = () => {
    setFormData(initialState);
    setCurrentPost(null);
    document.querySelector('input[type="file"]').value = null;
  };

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
        await createPost(data);
      }

      setRefresh((prev) => !prev);
      resetForm();
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <>
      {/* 🔍 Live Search Inputs */}
      <div className="Form_Container">
        <form className="form_fields" autoComplete="off">
          <div className="input_field inputSpace">
            <input
              type="text"
              name="searchMemory"
              placeholder=" "
              onChange={(e) => onSearch?.("title", e.target.value)}
            />
            <label>Search Memory</label>
          </div>
          <div className="input_field inputSpace">
            <input
              type="text"
              name="searchTags"
              placeholder=" "
              onChange={(e) => onSearch?.("tags", e.target.value)}
            />
            <label>Tags</label>
          </div>
        </form>
      </div>

      {/* 📝 Create/Edit Form */}
      <div className="Form_Container">
        <h3>{currentPost ? "Editing" : "Creating"} a Memory</h3>
        <form className="form_fields" onSubmit={handleSubmit} autoComplete="off">
          {["creator", "title", "message", "tags"].map((field) => (
            <div className="input_field" key={field}>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            </div>
          ))}

          <div className="input_field">
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="input_field">
            <button type="submit" className="btn Submit_btn">
              {currentPost ? "Update" : "Submit"}
            </button>
            <button type="button" className="btn Cancel_btn" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
