'use client';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import ReactQuill from 'react-quill';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PropTypes from 'prop-types';

/**
 * Capitalizes the first letter of each word in a given string.
 *
 * @param {string} str - The input string.
 * @return {string} The modified string with the first letter of each word capitalized.
 */
function capitalizeFirstLetterOfEachWord(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
export const RatingInfo = ({ rating, date }) => {
  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  });
  return (
    <div className="flex">
      <Rating value={rating} readOnly stars={5} cancel={false} />
      <p className="ml-3"> {formattedDate}</p>
    </div>
  );
};
RatingInfo.propTypes = {
  rating: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export const FeedbackCard = ({ feedback, index }) => (
  <Card key={index} className="p-col-12">
    <div className="p-3">
      <h3>{capitalizeFirstLetterOfEachWord(feedback.user.nome.toString())}</h3>
      <RatingInfo rating={feedback.rating} date={feedback.date} />
      <div dangerouslySetInnerHTML={{ __html: feedback.comment }} />
    </div>
    <Divider align="center" />
  </Card>
);
FeedbackCard.propTypes = {
  feedback: PropTypes.shape({
    user: PropTypes.shape({
      nome: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export const RatingField = ({ field, form }) => {
  return (
    <Rating
      {...field}
      onChange={(e) => {
        if (e.value !== field.value) {
          form.setFieldValue(field.name, e.value);
        }
      }}
      cancel={false}
    />
  );
};
RatingField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export const QuillField = ({ field, form }) => {
  return (
    <ReactQuill
      className="quill-container"
      {...field}
      onChange={(html) => form.setFieldValue(field.name, html)}
      onBlur={() => {
        form.setFieldTouched(field.name, true, false);
      }}
    />
  );
};
QuillField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};
