import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { fetchImages } from '../../api/imageApi';
import { Image } from '../../types';

jest.mock('../../api/imageApi');

const mockImages: Image[] = [
  {
    id: 1,
    title: 'Grey beach',
    price: 43,
    author: 'Mary Robinette',
    created_at: '2024-09-11T12:00:00Z',
    main_attachment: {
      big: 'https://example.com/big.jpg',
      small: 'https://example.com/small.jpg',
    },
    likes_count: 1,
    liked: false,
    links: [],
  },
];

describe('Home Component', () => {
  beforeEach(() => {
    (fetchImages).mockResolvedValue(mockImages); // Mock de la función fetchImages
  });

  it('renders images and handles search', async () => {
    render(<Home />);

    // Verificar que las imágenes se carguen
    await waitFor(() => {
      expect(screen.getByText(/Grey beach/i)).toBeInTheDocument();
    });

    // Simular búsqueda
    const searchInput = screen.getByPlaceholderText(/search images/i);
    fireEvent.change(searchInput, { target: { value: 'beach' } });

    await waitFor(() => {
      expect(screen.getByText(/Grey beach/i)).toBeInTheDocument();
    });
  });
});
