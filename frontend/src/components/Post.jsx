import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import NavbarComponent from "../pages/Navbar";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../styles/Post.module.css";

function Post() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [realisations, setRealisations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState({}); // Ukládá stav načítání obrázků

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

  const handleImageLoadStart = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageLoad = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
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
                  {loadingImages[post.id] && (
                    <div className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "250px" }}>
                      <Spinner animation="border" />
                    </div>
                  )}
                  <LazyLoadImage
                    src={`https://res.cloudinary.com/dotqkdyma/${post.image}?f_auto&q_auto`}
                    alt={post.title}
                    className={styles.realisationImage}
                    effect="blur"
                    width="100%"
                    height="250px"
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                      transition: "transform 0.3s ease-in-out",
                      cursor: "pointer",
                      display: loadingImages[post.id] ? "none" : "block", // Skryj obrázek, pokud se ještě načítá
                    }}
                    beforeLoad={() => handleImageLoadStart(post.id)}
                    onLoad={() => handleImageLoad(post.id)}
                  />
                  {post.visible && (
                    <div className={styles.imageOverlay}>
                      <div className={styles.overlayContent}>{post.title}</div>
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
          src: `https://res.cloudinary.com/dotqkdyma/${post.image}`,
          alt: post.title,
          title: post.title,
        }))}
        index={selectedImage ? selectedImage : 0}
      />
    </>
  );
}

export default Post;
