import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";

function CreatePost({ route, method }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false); // Nový stav pro checkbox
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPostsRoute, setIsPostsRoute] = useState(false); // Stav pro detekci "posts" v URL

  const navigate = useNavigate();
  const location = useLocation(); // Použijeme useLocation k získání aktuální URL

  // Detekce, zda je v URL přítomen "posts"
  useEffect(() => {
    if (location.pathname.includes("posts")) {
      setIsPostsRoute(true);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("image", image);
      if (isPostsRoute) {
        formData.append("visible", visible); // Přidáme visible pouze pokud je to cesta s "posts"
      }

      const res = await api.post(route, formData);
      let path = route;
      path = path.substring(0, path.lastIndexOf("/"));
      path = "/" + path.substring(path.indexOf("/") + 1);
      navigate(`${path}`);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-input"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-container">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          className="form-input"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      {/* Přidáme checkbox pouze pokud je to cesta s "posts" */}
      {isPostsRoute && (
        <div className="form-container">
          <label htmlFor="visible">Visible</label>
          <input
            type="checkbox"
            className="form-input"
            id="visible"
            checked={visible}
            onChange={(e) => setVisible(e.target.checked)}
          />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="form-button" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default CreatePost;