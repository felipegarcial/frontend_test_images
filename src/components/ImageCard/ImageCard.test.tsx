import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageCard from './ImageCard';
import { Image } from '../../types';

const mockImage: Image = {
  id: 1,
  title: 'Test Image',
  price: 50,
  author: 'Test Author',
  created_at: '2024-09-11T12:00:00Z',
  main_attachment: {
    big: 'https://example.com/big.jpg',
    small: 'https://example.com/small.jpg',
  },
  likes_count: 10,
  liked: false,
  links: [],
};

describe('ImageCard Component', () => {
  it('renders image title and author correctly', () => {
    render(<ImageCard image={mockImage} onLike={() => {}} />);

    expect(screen.getByText(/Test Image/i)).toBeInTheDocument();
    expect(screen.getByText(/by Test Author/i)).toBeInTheDocument();
  });

  it('calls the onLike function when the like button is clicked', () => {
    const mockOnLike = jest.fn(); 

    render(<ImageCard image={mockImage} onLike={mockOnLike} />);

    const likeButton = screen.getByRole('button', { name: /like/i });

    fireEvent.click(likeButton);

    expect(mockOnLike).toHaveBeenCalledTimes(1);
  });
});
