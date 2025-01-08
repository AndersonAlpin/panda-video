import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('GET /', () => {
  it('should respond with a 200 status code', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('API is running.')
  });
});