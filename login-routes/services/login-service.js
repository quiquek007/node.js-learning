import jwt from 'jsonwebtoken';

export default class LoginService {
    constructor(provider) {
        this.provider = provider;
    }

    async login(login, password) {
        if (!(login && password)) throw new Error('All inputs are required');

        const user = await this.provider.getUserByCondition({ where: { login }, raw: true });

        if (user && user.password === password) {
            const token = jwt.sign({ user_id: user.id, login }, 'taina', {
                expiresIn: '2h'
            });

            user.token = token;
            return user;
        }

        throw new Error('Invalid Credentials');
    }
}
