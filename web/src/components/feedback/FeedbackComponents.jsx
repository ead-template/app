import moment from 'moment'
import { Divider } from 'primereact/divider'
import { Card } from 'primereact/card'
import { Rating } from 'primereact/rating'
import ReactQuill from 'react-quill'
import React from 'react'

function capitalizeFirstLetterOfEachWord(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
export const RatingInfo = ({ rating, date }) => (
  <div className="flex">
    <Rating value={rating} readOnly stars={5} cancel={false} />
    <p className="ml-3"> {moment(date).fromNow()}</p>
  </div>
)

export const FeedbackCard = ({ feedback, index }) => (
  <Card key={index} className="p-col-12">
    <div className="p-3">
      <h3>{capitalizeFirstLetterOfEachWord(feedback.user.nome.toString())}</h3>
      <RatingInfo rating={feedback.rating} date={feedback.date} />
      <div dangerouslySetInnerHTML={{ __html: feedback.comment }} />
    </div>
    <Divider align="center" />
  </Card>
)

export const RatingField = ({ field, form }) => {
  return (
    <Rating
      {...field}
      onChange={(e) => {
        if (e.value !== field.value) {
          form.setFieldValue(field.name, e.value)
        }
      }}
      cancel={false}
    />
  )
}

export const QuillField = ({ field, form }) => {
  return (
    <ReactQuill
      className="quill-container"
      {...field}
      onChange={(html) => form.setFieldValue(field.name, html)}
      onBlur={() => {
        form.setFieldTouched(field.name, true, false)
      }}
    />
  )
}
