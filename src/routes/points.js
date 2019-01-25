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
  const { latitude, longitude } = req.body
  const errors = []
  if (!latitude) {
    errors.push({text: 'Please Write a latitude.'})
  }
  if (!longitude) {
    errors.push({text: 'Please Write a longitude'})
  }
  if (errors.length > 0) {
    res.render('points/new-point', {
      errors,
      latitude,
      longitude
    })
  } else {
    const newPoint = new Point({latitude, longitude})
    newPoint.user = req.user.id
    await newPoint.save()
    req.flash('success_msg', 'Point Added Successfully')
    res.redirect('/points/add')
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
  const { latitude, longitude } = req.body
  await Point.findByIdAndUpdate(req.params.id, {latitude, longitude})
  req.flash('success_msg', 'Point Updated Successfully')
  res.redirect('/points')
})

// Delete Points
router.delete('/points/delete/:id', isAuthenticated, async (req, res) => {
  await Point.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Point Deleted Successfully')
  res.redirect('/points')
})

// Get All Routes Shared
router.get('/routes', isAuthenticated, async (req, res) => {
  res.render('points/routes',)
})

router.post('/points/new-route', isAuthenticated, async (req, res) => {
  req.flash('success_msg', 'Route Shared Successfully')
  res.redirect('/routes')
})

module.exports = router