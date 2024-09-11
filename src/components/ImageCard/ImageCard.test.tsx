import { render, screen, fireEvent } from '@testing-library/react';
import ImageCard from './ImageCard';
import { Image } from '../../types';

const mockImage: Image = {
  id: 1,
  title: 'Test Image',
  price: 30,
  author: 'Test Author',
  main_attachment: {
    big: 'https://example.com/big.jpg',
    small: 'https://example.com/small.jpg',
  },
  likes_count: 10,
  liked: false,
  created_at: '2022-01-01T00:00:00Z',
  links: [],
};

describe('ImageCard', () => {
  it('renders the image card with the correct details', () => {
    render(<ImageCard image={mockImage} onLike={() => {}} />);

    expect(screen.getByText(/Test Image/i)).toBeInTheDocument();
    expect(screen.getByText(/by Test Author/i)).toBeInTheDocument();
    expect(screen.getByText(/30 €/i)).toBeInTheDocument();
  });

  it('calls the onLike function when the like button is clicked', () => {
    const mockOnLike = vi.fn();
    render(<ImageCard image={mockImage} onLike={mockOnLike} />);

    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    expect(mockOnLike).toHaveBeenCalledTimes(1);
  });
});
