const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')

router.get('/', (req, res) => {
    Coaster
        .find()
        .then(response => res.render('./coasters/coasters-index', { response }))
        .catch(err => console.log(err))
})
router.get('/new', (req, res) => {

    Park
        .find()
        .select('name')
        .then(response => res.render('./coasters/new-coaster', { response }))
        .catch(err => console.log(err))
})

router.post('/new', (req, res) => {

    const { name, description, inversions, length, park } = req.body

    Coaster
        .create({ name, description, inversions, length, park })
        .then(response => res.redirect('/coasters'))
        .catch(err => console.log(err))
})

router.get('/delete', (req, res) => {

    const coasters_id = req.query.id

    Coaster
        .findByIdAndRemove(coasters_id)
        .then(() => res.redirect(`/coasters`))
        .catch(err => console.log(err))
})

router.get('/edit', (req, res) => {

    const rollerCoaster_id = req.query.id
    let rCoaster
    Coaster
        .findById(rollerCoaster_id)
        .then(rollercoaster => {
            rCoaster = rollercoaster
            return Park.find()
        })
        .then(resPark => {
            console.log(resPark)
            res.render('./coasters/coaster-edit', { rcoaster: rCoaster, park: resPark })
        })
        .catch(err => console.log(err))
})

router.post('/edit', (req, res) => {

    const { name, description, inversions, length, park } = req.body
    const coaster_id = req.query.id


    Coaster
        .findByIdAndUpdate(coaster_id, { name, description, inversions, length, park })
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))
})


router.get('/:id', (req, res) => {

    const coaster_id = req.params.id
    let rollerCoaster

    Coaster
        .findById(coaster_id)
        .then(response => {
            rollerCoaster = response
            return Park.findById(rollerCoaster.park)
        })
        .then(resPark => res.render('./coasters/coaster-details', { coaster: rollerCoaster, park: resPark }))
        .catch(err => console.log(err))
})




module.exports = router