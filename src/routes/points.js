const express = require('express')
const router = express.Router()

// Models
const Point = require('../models/Point')

// Helpers
const { isAuthenticated } = require('../helpers/auth')

// New Point
router.get('/points/add', isAuthenticated, (req, res) => {
  res.render('points/new-point')
})

router.post('/points/new-point', isAuthenticated, async (req, res) => {
  const { title, description } = req.body
  const errors = []
  if (!title) {
    errors.push({text: 'Please Write a Title.'})
  }
  if (!description) {
    errors.push({text: 'Please Write a Description'})
  }
  if (errors.length > 0) {
    res.render('points/new-point', {
      errors,
      title,
      description
    })
  } else {
    const newPoint = new Point({title, description})
    newPoint.user = req.user.id
    await newPoint.save()
    req.flash('success_msg', 'Point Added Successfully')
    res.redirect('/points')
  }
})

// Get All Points
router.get('/points', isAuthenticated, async (req, res) => {
  const points = await Point.find({user: req.user.id}).sort({date: 'desc'})
  res.render('points/all-points', { points })
})

// Edit Points
router.get('/points/edit/:id', isAuthenticated, async (req, res) => {
  const point = await Point.findById(req.params.id)
  if(point.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized')
    return res.redirect('/points')
  } 
  res.render('points/edit-point', { point })
})

router.put('/points/edit-point/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body
  await Point.findByIdAndUpdate(req.params.id, {title, description})
  req.flash('success_msg', 'Point Updated Successfully')
  res.redirect('/points')
})

// Delete Points
router.delete('/points/delete/:id', isAuthenticated, async (req, res) => {
  await Point.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Point Deleted Successfully')
  res.redirect('/points')
})

module.exports = router
