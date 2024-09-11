/* eslint-disable react-hooks/exhaustive-deps */
import './Home.css';
import React, { useState, useEffect } from 'react';
import { fetchImages, likeImage } from '../../api/imageApi';
import Header from '../../components/Header/Header';
import { Image } from '../../types';
import ImageGrid from '../../components/ImagesGrid/ImageGrid';
import useSearch from '../../hooks/useSearch';

const Home: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const searchState = useSearch();

  // Función para cargar imágenes
  const loadImages = async (pageToLoad: number) => {
    try {
      const data = await fetchImages(pageToLoad, searchState.searchQuery);
      if (pageToLoad === 1) {
        setImages(data);
      } else {
        setImages((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Efecto para manejar la búsqueda y el reinicio de las imágenes y la página
  useEffect(() => {
    setPage(1);
    setImages([]); 
    loadImages(1); 
  }, [searchState.searchQuery]);

  // Efecto para cargar más imágenes cuando cambia la página
  useEffect(() => {
    if (page !== 1) {
      loadImages(page);
    }
  }, [page]); 

  // Manejar el "like"
  const handleLike = (id: number) => {
    likeImage(id).then(() => {
      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? { ...img, liked: !img.liked, likes_count: img.liked ? img.likes_count - 1 : img.likes_count + 1 }
            : img
        )
      );
    });
  };

  // Función para manejar el scroll infinito (solo hacia abajo)
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      setPage((prevPage) => prevPage + 1); // Cargar más imágenes al hacer scroll hacia abajo
    }
  };

  // Efecto para detectar el scroll hacia abajo
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-wrapper">
      <div className="header-wrapper">
        <Header searchState={searchState} />
      </div>
      <div className="grid-wrapper">
        <ImageGrid images={images} handleLike={handleLike} />
      </div>
    </div>
  );
};

export default Home;
