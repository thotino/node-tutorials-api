const supertest = require('supertest')
const app = require('../index')


describe('', () => {
    const user = {
        username: 'test',
        password: 'test',
        email: 'test@test.com',
        roles: ['user']
    }
    // afterEach((done) => (app && app.close(done)))
    test('', async () => {
        const { body, status } = await supertest(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(user)
        expect(status).toEqual(200)
    }, 800)
})