import { Container, Row, Col, Card, Image, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../api";
import { useParams, Link } from "react-router-dom";
import NavbarComponent from "../pages/Navbar";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import RowsPhotoAlbum from "react-photo-album";
import "react-photo-album/rows.css";
import styles from "../styles/Post.module.css";

function Post() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [realisations, setRealisations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts();
    getRealisations();
  }, []);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };


  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const getPosts = async () => {
    try {
      const res = await api.get(`api/realisations/${id}/posts`);
      const data = res.data;
      setPosts(data);

      // Preload images
      const imagePromises = data.map((post) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = `https://res.cloudinary.com/dotqkdyma/${post.image}`;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(imagePromises);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const getRealisations = () => {
    api
      .get("/api/realisations/")
      .then((res) => res.data)
      .then((data) => {
        const realisation = data.find((realisation) => String(realisation.id) === id);
        setRealisations(realisation ? [realisation] : []);
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <NavbarComponent />
      {isLoading ? (
        <div className="loading-container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }} />
        </div>
      ) : (
        <Container style={{ minHeight: "75vh" }}>
          <h1 className="text-center my-4">{realisations[0]?.title}</h1>

          <Row className="justify-content-center">
            {posts.map((post, index) => (
              <Col key={post.id} xs={12} sm={10} md={6} lg={4} className="d-flex justify-content-center">
                <div className={styles.imageContainer} onClick={() => handleImageClick(index)} style={{ cursor: "pointer" }}>
                  <Image
                    src={`https://res.cloudinary.com/dotqkdyma/${post.image}`}
                    alt={post.title}
                    className={styles.realisationImage}
                    fluid
                    onClick={() => handleImageClick(index)} // Předá index obrázku
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      transition: "transform 0.3s ease-in-out",
                      cursor: "pointer",
                    }}
                  />
                  {post.visible && ( // Zobrazí název pouze pokud je visible true
                    <div className={styles.imageOverlay}>
                      <div className={styles.overlayContent}>
                        {post.title}
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Container>


        
      )}
        <Lightbox
          open={lightboxOpen}
          close={handleLightboxClose}
          slides={posts.map((post) => ({
            src: "https://res.cloudinary.com/dotqkdyma/" + post.image,
            alt: post.title,
            title: post.title
          }))}
          index={selectedImage ? selectedImage : 0}
          />
    </>
  );
}

export default Post;
