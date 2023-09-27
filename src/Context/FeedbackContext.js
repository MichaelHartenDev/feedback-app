import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'I recently purchased your product off of your website and I am absolutely thrilled with it! This product is well-made, easy to use, and has exceeded all of my expectations. I highly recommend it to anyone looking for a product like this!',
      rating: 10,
    },
    {
      id: 2,
      text: 'Ive been using this product since the summer and I am absolutely loving it! It is the perfect addition to my home setup and it has made my life so much easier.',
      rating: 9,
    },
    {
      id: 3,
      text: 'Overall, I am happy with this product, but I think it is important to be aware of the drawbacks before you buy it. It is expensive and it is not for everyone.',
      rating: 6,
    },
  ])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  //Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }


  //Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
  }



  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }


  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
