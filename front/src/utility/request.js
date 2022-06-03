const proxy = 'http://localhost:4200';

export const http = {
    request: async (url, method = 'GET', body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            headers['x-access-token'] = sessionStorage.getItem('token');
            const response = await fetch(proxy + url, { method, body, headers });

            if (response.status === 404) throw new Error('404: Not Found');

            const data = await response.json();

            return data;
        } catch (err) {
            throw new Error(err);
        }
    }
};
