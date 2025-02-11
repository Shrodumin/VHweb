import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../api";

function CreatePost({route, method}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try{
            const formData = new FormData()
            formData.append('title', name)
            formData.append('image', image)
            const res = await api.post(route, formData)
            var path = route
            path = path.substring(0, path.lastIndexOf('/'))
            navigate(`${path}`)
        }
        catch(error) {
            alert(error)
        }finally{
            setLoading(false)
        }
    }

  return <form onSubmit={handleSubmit}>
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
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
            </button>
    </form>
}

export default CreatePost;