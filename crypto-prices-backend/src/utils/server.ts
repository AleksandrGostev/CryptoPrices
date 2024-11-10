import cors from 'cors';
import express, { Express } from 'express';

export const getWebApp = () => {
    const app: Express = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return app;
};
