const allowedOrigins = [
  'http://localhost:3000',
  'https://example.com',
  'https://another-example.com',
];

export const corsOptions = {
    origin: (origin, callback) => {
        if(origin && !allowedOrigins.includes(origin)) {
            const error = new Error('Not allowed by CORS');
            error.name = 'CorsError';
            return callback(error);
        }
        callback(null, true);
    },
    optionsSuccessStatus: 200, // For legacy browser support
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}