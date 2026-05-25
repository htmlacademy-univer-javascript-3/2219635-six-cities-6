import {ChangeEvent, FormEvent, Fragment, useState} from 'react';

const RATING_OPTIONS = [
  {value: '5', labelId: '5-stars', title: 'perfect'},
  {value: '4', labelId: '4-stars', title: 'good'},
  {value: '3', labelId: '3-stars', title: 'not bad'},
  {value: '2', labelId: '2-stars', title: 'badly'},
  {value: '1', labelId: '1-star', title: 'terribly'},
];

type FormState = {
  rating: string;
  review: string;
};

function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState<FormState>({
    rating: '',
    review: '',
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, rating: evt.target.value});
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, review: evt.target.value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_OPTIONS.map(({value, labelId, title}) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={labelId}
              type="radio"
              checked={formData.rating === value}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={labelId}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use href="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
