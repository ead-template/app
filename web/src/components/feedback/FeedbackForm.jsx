import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'primereact/button'
import { QuillField, RatingField } from './FeedbackComponents'
import * as Yup from 'yup'

const FeedbackForm = ({ onSubmit, initialValues }) => {
  const validationSchema = Yup.object().shape({
    rating: Yup.number().required('O campo classificação é obrigatório'),
    comment: Yup.string().required('O campo comentário é obrigatório'),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="p-field">
          <label className="mb-1" htmlFor="rating">
            Classificação
          </label>
          <Field name="rating" component={RatingField} />
          <ErrorMessage name="rating" component="div" />
        </div>

        <div className="p-field mt-2">
          <label htmlFor="comment">Comentário</label>
          <Field name="comment" component={QuillField} />
          <ErrorMessage name="comment" component="div" />
        </div>

        <Button className="mt-6" type="submit" label="Enviar Feedback" />
      </Form>
    </Formik>
  )
}

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    rating: PropTypes.number,
    comment: PropTypes.string,
  }).isRequired,
}

export default FeedbackForm
