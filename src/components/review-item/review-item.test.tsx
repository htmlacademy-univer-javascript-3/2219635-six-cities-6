import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import ReviewItem from './review-item';
import {makeMockReview} from '../../utils/mock';

describe('ReviewItem', () => {
  it('should render user name', () => {
    const review = makeMockReview();
    render(<ReviewItem review={review} />);
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
  });

  it('should render review comment', () => {
    const review = makeMockReview();
    render(<ReviewItem review={review} />);
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });

  it('should render user avatar', () => {
    const review = makeMockReview();
    render(<ReviewItem review={review} />);
    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', review.user.avatarUrl);
  });

  it('should render date time attribute', () => {
    const review = {...makeMockReview(), date: '2024-03-15T10:00:00.000Z'};
    const {container} = render(<ReviewItem review={review} />);
    const time = container.querySelector('time');
    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute('dateTime', '2024-03-15');
  });
});
