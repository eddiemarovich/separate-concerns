const model = require('../models/models')

let getAll = (req, res, next) => {
  const data = model.getAll()
  res.status(200).json({ data })
}

let getById = (req, res, next) => {
  const data = model.getById(req.params.id)
  console.log(data);
  if (!data) return next({ status: 404, message: `Could not find shoe with id of ${req.params.id}` })

  res.status(200).json({  data })
}

let makeNewShoe = (req, res, next) => {
  const bigData = model.makeNewShoe(req.body)
  if (bigData.errors) return next({ status: 400, message: `Fields model and brand are required`, errors: bigData.errors })
  res.status(201).json({ data: bigData })
}

let updateShoe = (req, res, next) => {
  const result = model.updateShoe(req.params.id, req.body)
  if (result.errors) return next({ status: 400, message: `Error`, errors: result.errors })
  res.status(200).json({ data: result })
}

let deleteShoe = (req, res, next) => {
  const result = model.deleteShoe(req.params.id)
  if (result.errors) return next({ status: 404, message: `Error`, errors: result.errors})
  res.status(204).json({})
}

module.exports = {
  getAll,
  getById,
  makeNewShoe,
  updateShoe,
  deleteShoe
}
