const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('Shoes Resources', function () {
  describe('POST /', function () {
    it('should create a shoe', function (done) {
      const shoe = { model: 'Furia', brand: 'SCARPA' }
      chai.request(app)
        .post('/shoes')
        .send(shoe)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.id).to.be.ok
          expect(res.body.data.model).to.equal(shoe.model)
          expect(res.body.data.brand).to.equal(shoe.brand)
          done()
        })
    })

    it('should return an error if model is missing', function (done) {
      const shoe = { brand: 'SCARPA' }
      chai.request(app)
        .post('/shoes')
        .send(shoe)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if shoe is missing', function (done) {
      const shoe = { model: 'Furia' }
      chai.request(app)
        .post('/shoes')
        .send(shoe)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('GET /', function () {
    it('should retrieve a list of all the shoes', function (done) {
      chai.request(app)
        .get('/shoes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const shoe = res.body.data[0]
          expect(shoe).to.be.an('object')
          expect(shoe.id).to.be.ok
          done()
        })
    })
  })

  describe('GET /:id', function () {
    it('should retrieve the single shoe specified', function (done) {
      chai.request(app)
        .get('/shoes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const shoe = res.body.data[0]
          chai.request(app)
            .get(`/shoes/${shoe.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')

              expect(res.body.data.id).to.equal(shoe.id)
              done()
            })
        })
    })

    it('should return an error if the id does not match a shoe', function (done) {
      chai.request(app)
        .get('/shoes/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('PUT /:id', function () {
    it('should update an existing shoe when all information is provided', function (done) {
      chai.request(app)
        .get('/shoes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const shoe = res.body.data[0]
          const newInfo = { model: 'Willy', brand: 'Black Lab/Golden Retriever Mix' }
          chai.request(app)
            .put(`/shoes/${shoe.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.id).to.be.ok
              expect(res.body.data.model).to.equal(newInfo.model)
              expect(res.body.data.brand).to.equal(newInfo.brand)
              done()
            })
        })

    })

    it('should return an error if model is missing', function (done) {
      chai.request(app)
        .get('/shoes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const shoe = res.body.data[0]
          const newInfo = { brand: 'Black Lab/Golden Retriever Mix' }
          chai.request(app)
            .put(`/shoes/${shoe.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if brand is missing', function (done) {
      chai.request(app)
        .get('/shoes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const shoe = res.body.data[0]
          const newInfo = { model: 'Willy' }
          chai.request(app)
            .put(`/shoes/${shoe.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })
  })

  describe('DELETE /:id', function () {
    it('should remove the specified shoe', function (done) {
      chai.request(app)
        .get('/shoes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const shoe = res.body.data[0]
          chai.request(app)
            .delete(`/shoes/${shoe.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(204)
              chai.request(app)
                .get(`/shoes/${shoe.id}`)
                .end((err, res) => {
                  expect(res.status).to.equal(404)
                  done()
                })
            })
        })
    })

    it('should return an error if the id is not found', function (done) {
      chai.request(app)
        .delete('/shoes/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })
})
