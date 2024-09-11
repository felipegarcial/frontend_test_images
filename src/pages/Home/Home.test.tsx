import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { fetchImages, likeImage } from '../../api/imageApi';
import useSearch from '../../hooks/useSearch';
import { vi } from 'vitest';

// Mockear las dependencias
vi.mock('../../api/imageApi', () => ({
  fetchImages: vi.fn(),
  likeImage: vi.fn(),
}));

vi.mock('../../hooks/useSearch', () => ({
  default: vi.fn(() => ({
    searchQuery: '',
  })),
}));

describe('Home component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and display images on load', async () => {
    // Mock de la respuesta de la API
    const mockImages = [
      { id: 1, title: 'Image 1', author: 'Author 1', price: 10, likes_count: 0, liked: false, main_attachment: { small: 'url1' } },
      { id: 2, title: 'Image 2', author: 'Author 2', price: 20, likes_count: 0, liked: false, main_attachment: { small: 'url2' } },
    ];
    
    (fetchImages as vi.Mock).mockResolvedValue(mockImages);

    render(<Home />);

    // Verificar que se están cargando las imágenes
    await waitFor(() => {
      expect(fetchImages).toHaveBeenCalledWith(1, '');
      expect(screen.getByText('Image 1')).toBeInTheDocument();
      expect(screen.getByText('Image 2')).toBeInTheDocument();
    });
  });

  it('should reset images and page when search query changes', async () => {
    const mockImages = [{ id: 1, title: 'New Image', author: 'New Author', price: 10, likes_count: 0, liked: false, main_attachment: { small: 'new_url' } }];
    
    (fetchImages as vi.Mock).mockResolvedValue(mockImages);
    (useSearch as vi.Mock).mockReturnValue({ searchQuery: 'new search' });

    render(<Home />);

    // Esperar que se llame a la API con la nueva búsqueda
    await waitFor(() => {
      expect(fetchImages).toHaveBeenCalledWith(1, 'new search');
      expect(screen.getByText('New Image')).toBeInTheDocument();
    });
  });

  it('should load more images when scrolling to bottom', async () => {
    // Mock de las imágenes
    const initialImages = [{ id: 1, title: 'Image 1', author: 'Author 1', price: 10, likes_count: 0, liked: false, main_attachment: { small: 'url1' } }];
    const moreImages = [{ id: 2, title: 'Image 2', author: 'Author 2', price: 20, likes_count: 0, liked: false, main_attachment: { small: 'url2' } }];
    
    (fetchImages as vi.Mock)
      .mockResolvedValueOnce(initialImages)  // Para la primera carga
      .mockResolvedValueOnce(moreImages);    // Para la segunda carga

    render(<Home />);

    // Esperar la primera carga
    await waitFor(() => {
      expect(screen.getByText('Image 1')).toBeInTheDocument();
    });

    // Simular scroll al final de la página
    fireEvent.scroll(window, { target: { scrollingElement: { scrollTop: 1000 } } });

    // Esperar que se carguen más imágenes
    await waitFor(() => {
      expect(fetchImages).toHaveBeenCalledTimes(2); // Verificar que se llamó dos veces a fetchImages
      expect(screen.getByText('Image 2')).toBeInTheDocument();
    });
  });

  it('should handle like functionality', async () => {
    const mockImages = [{ id: 1, title: 'Image 1', author: 'Author 1', price: 10, likes_count: 0, liked: false, main_attachment: { small: 'url1' } }];
    (fetchImages as vi.Mock).mockResolvedValue(mockImages);

    render(<Home />);

    // Esperar a que se carguen las imágenes
    await waitFor(() => {
      expect(screen.getByText('Image 1')).toBeInTheDocument();
    });

    // Mockear el like
    (likeImage as vi.Mock).mockResolvedValue({});

    // Simular un clic en el botón de like
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(likeImage).toHaveBeenCalledWith(1);
    });
  });
});
