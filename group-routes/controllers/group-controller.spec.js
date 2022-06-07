import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import groupController from './group-controller.js';

const app = new express();
const getAllArr = [1, 2];
app.use('/', groupController);

jest.mock(
    '../data-access/group-provider.js',
    () =>
        function () {
            return {
                getUserByCondition: () => Promise.resolve(jest.fn())
            };
        }
);
jest.mock(
    '../services/group.service.js',
    () =>
        function () {
            return {
                getAll: () => Promise.resolve(getAllArr),
                getGroup: () => Promise.resolve(getAllArr[0]),
                deleteGroup: () => Promise.resolve(),
                createGroup: () => Promise.resolve(),
                updateGroup: () => true,
                getSuggestionsList: () => Promise.resolve()
            };
        }
);

describe('group-controller', () => {
    test('verifyToken: should get 401 for unauthorized user', async () => {
        // act
        const res = await request(app).get('/group/asd-4');
        // assert
        expect(res.status).toBe(401);
        expect(res.text).toEqual('Unauthorized Error');
    });

    test('verifyToken: should get 403 for expired token', async () => {
        // act
        const res = await request(app).get('/group/asd-4').set('x-access-token', 'incorrect token');

        // assert
        expect(res.status).toBe(403);
        expect(res.text).toEqual('Forbidden Error');
    });

    test('get:should get 200 on /group/all', async () => {
        // arrange
        jwt.verify = jest.fn();

        // act
        const res = await request(app).get('/group/all').set('x-access-token', 'correct token');

        // assert
        expect(res.status).toBe(200);
    });

    test('get:should get 200', async () => {
        // arrange
        jwt.verify = jest.fn();

        // act
        const res = await request(app).get('/group/asd-4').set('x-access-token', 'correct token');

        // assert
        expect(res.status).toBe(200);
    });

    test('delete:should get 200', async () => {
        // act
        const res = await request(app).delete('/group/asd-4').set('x-access-token', 'correct token');
        // assert
        expect(res.status).toBe(200);
        expect(res.text).toEqual('"success"');
    });

    test('post:should get 200', async () => {
        // act
        const res = await request(app).post('/group').set('x-access-token', 'correct token');
        // assert
        expect(res.status).toBe(200);
    });

    test('put:should get 200', async () => {
        // act
        const res = await request(app).put('/group').set('x-access-token', 'correct token');
        // assert
        expect(res.status).toBe(200);
        expect(res.text).toEqual('"success"');
    });

    test('suggestions:get:should get 200', async () => {
        // arrange
        jwt.verify = jest.fn();

        // act
        const res = await request(app).get('/group/suggestions/asd-4').set('x-access-token', 'correct token');

        // assert
        expect(res.status).toBe(200);
    });
});
