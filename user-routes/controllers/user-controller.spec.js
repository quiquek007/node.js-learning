import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import userController from './user-controller.js';

const app = new express();
app.use('/', userController);

jest.mock(
    '../data-access/user-provider.js',
    () =>
        function () {
            return {
                getAllUsers: () => jest.fn(),
                getUserByCondition: () => Promise.resolve(jest.fn()),
                buildUser: () => null
            };
        }
);
jest.mock(
    '../servises/user-service.js',
    () =>
        function () {
            return {
                getUser: () => Promise.resolve(jest.fn()),
                deleteUser: () => Promise.resolve(jest.fn()),
                createUser: () => 'id',
                updateUser: () => Promise.resolve(jest.fn()),
                getSuggestionsList: () => Promise.resolve(jest.fn())
            };
        }
);

describe('user-controller', () => {
    test('should get 404 on /user', async () => {
        // act
        const res = await request(app).get('/user');
        // assert
        expect(res.status).toBe(404);
        expect(res.text).toEqual('UserId is required!');
    });

    test('verifyToken: should get 401 for unauthorized user', async () => {
        // act
        const res = await request(app).get('/user/asd-4');
        // assert
        expect(res.status).toBe(401);
        expect(res.text).toEqual('Unauthorized Error');
    });

    test('verifyToken: should get 403 for expired token', async () => {
        // act
        const res = await request(app).get('/user/asd-4').set('x-access-token', 'incorrect token');

        // assert
        expect(res.status).toBe(403);
        expect(res.text).toEqual('Forbidden Error');
    });

    test('get:should get 200', async () => {
        // arrange
        jwt.verify = jest.fn();

        // act
        const res = await request(app).get('/user/asd-4').set('x-access-token', 'correct token');

        // assert
        expect(res.status).toBe(200);
    });

    test('delete:should get 200', async () => {
        // act
        const res = await request(app).delete('/user/asd-4').set('x-access-token', 'correct token');
        // assert
        expect(res.status).toBe(200);
        expect(res.text).toEqual('"success"');
    });

    test('post:should get 200', async () => {
        // act
        const res = await request(app).post('/user').set('x-access-token', 'correct token');
        // assert
        expect(res.status).toBe(200);
    });

    test('put:should get 200', async () => {
        // act
        const res = await request(app).put('/user').set('x-access-token', 'correct token');
        // assert
        expect(res.status).toBe(200);
        expect(res.text).toEqual('"success"');
    });

    test('suggestions:get:should get 200', async () => {
        // arrange
        jwt.verify = jest.fn();

        // act
        const res = await request(app).get('/user/suggestions/asd-4').set('x-access-token', 'correct token');

        // assert
        expect(res.status).toBe(200);
    });
});
