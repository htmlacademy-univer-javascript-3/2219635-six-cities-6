import {useState} from 'react';

const SORT_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;

type SortType = typeof SORT_OPTIONS[number];

type SortingOptionsProps = {
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
};

function SortingOptions({activeSort, onSortChange}: SortingOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_OPTIONS.map((option) => (
            <li
              key={option}
              className={`places__option${option === activeSort ? ' places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => {
                onSortChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export type {SortType};
export default SortingOptions;
