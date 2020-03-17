import axios from 'axios';

export default axios.create({
    baseURL: 'https://stocknewsapi.com/api/v1?',
    headers: {
        Authorization:
            'Bearer rshxb16ikutee9nv3bzvle1wodwmness8xl7egv9'
    }
});