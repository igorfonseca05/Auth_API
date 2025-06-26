
const request = require('supertest')
const { app, mongoose } = require('../../app')


describe('Testing Auth API', () => {

    test('Should Signup for the app', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                name: "Eduar",
                email: "eduardoTo@gmail.com",
                password: "12345678"
            })
        expect(res.statusCode).toBe(200)
    })






})