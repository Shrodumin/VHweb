import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import NavbarComponent from "../pages/Navbar";
import Image from "react-bootstrap/Image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import "../styles/Post.css";


function Post() {
  const {id} = useParams()
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [realisations, setRealisations] = useState([]);
  const[index, setIndex] = useState(-1);



  useEffect(() => {
    getPosts();
    getRealisations();
  }, []);


  const getPosts = () => {
    api
      .get(`api/realisations/${id}/posts`)
      .then((res) => res.data)
      .then((data) => setPosts(data))
      .catch((err) => alert(err));
  };

  const getRealisations = () => {
    api
      .get("/api/realisations/")
      .then((res) => res.data)
      .then((data) => {
        const realisation = data.find((realisations) => String(realisations.id) === id);
        setRealisations(realisation ? [realisation] : []);
      })
      .catch((err) => alert(err));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const photos = posts.map((post) => ({
    src: "https://res.cloudinary.com/dotqkdyma/"+post.image,
    width: 800,
    height: 400,
  }));

  return (
    <>
    <NavbarComponent/>
    

    <Container>
      <h1 className="text-center" style={{marginTop: "50px"}}>{realisations[0]?.title}</h1>
    
      <RowsPhotoAlbum 
        photos={photos} 
        onClick={(photo) => handleImageClick(photo)}
        />

      <Lightbox
        open={lightboxOpen}
        close={handleLightboxClose}
        slides={posts.map((post) => ({
          src: "https://res.cloudinary.com/dotqkdyma/"+post.image,
          alt: post.title,
        }))}
        index={selectedImage && selectedImage.index !== undefined ? selectedImage.index : 0}
      />
    </Container>
    </>
  );
}

export default Post;