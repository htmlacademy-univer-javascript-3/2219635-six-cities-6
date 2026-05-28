import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import SortingOptions from './sorting-options';

describe('SortingOptions', () => {
  it('should render the current active sort option', () => {
    render(<SortingOptions activeSort="Popular" onSortChange={vi.fn()} />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('should not show dropdown by default', () => {
    const {container} = render(
      <SortingOptions activeSort="Popular" onSortChange={vi.fn()} />
    );
    expect(container.querySelector('.places__options--opened')).not.toBeInTheDocument();
  });

  it('should show dropdown when sort type is clicked', () => {
    render(<SortingOptions activeSort="Popular" onSortChange={vi.fn()} />);
    fireEvent.click(screen.getByText('Popular'));
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should call onSortChange with correct value when option is clicked', () => {
    const handleSortChange = vi.fn();
    render(<SortingOptions activeSort="Popular" onSortChange={handleSortChange} />);
    fireEvent.click(screen.getByText('Popular'));
    fireEvent.click(screen.getByText('Price: low to high'));
    expect(handleSortChange).toHaveBeenCalledWith('Price: low to high');
    expect(handleSortChange).toHaveBeenCalledTimes(1);
  });

  it('should close dropdown after option is selected', () => {
    const {container} = render(
      <SortingOptions activeSort="Popular" onSortChange={vi.fn()} />
    );
    fireEvent.click(screen.getByText('Popular'));
    fireEvent.click(screen.getByText('Top rated first'));
    expect(container.querySelector('.places__options--opened')).not.toBeInTheDocument();
  });

  it('should highlight active sort option in dropdown', () => {
    const {container} = render(
      <SortingOptions activeSort="Price: low to high" onSortChange={vi.fn()} />
    );
    fireEvent.click(screen.getByText('Price: low to high'));
    const activeOption = container.querySelector('.places__option--active');
    expect(activeOption?.textContent).toBe('Price: low to high');
  });
});
