import express from 'express';
import http from "http"
import path from 'path';
import { AddressInfo } from 'net'
var url = require('url');
var async = require('async');
var fs = require('graceful-fs').promises;
const log4js = require("log4js");

let server: http.Server;

exports.heartbeat = async () => {
    return true;
};

exports.shutdown = async () => {
    await server?.close();
    return true;
};

exports.port = () => {
    return (server?.address() as AddressInfo)?.port;
};

exports.start = async () => {
    const APP_NAME = "jgantts-website";
    const PUBLIC_DIR = path.join(path.dirname(await fs.realpath(__filename)), 'PUBLIC');

    log4js.configure({
        appenders: { publish: { type: "file", filename: `${APP_NAME}.log` } },
        categories: { default: { appenders: ["publish"], level: "error" } }
    });
    const logger = log4js.getLogger();
    logger.level = "debug";

    logger.debug(`${APP_NAME} starting`);

    const app = express();
    server = app.listen(0, (): void => {
        logger.debug(`Node Site #${process.pid} started on port ${(server?.address() as AddressInfo)?.port}`);
    });

    logger.debug(`NODE_SITE_PUB_ENV: ${process.env.NODE_SITE_PUB_ENV}`);

    app.get('/admin*', async (req: express.Request, res: express.Response) => {
        let reqUrl = req.url;

        if (reqUrl === "/admin/error/crash/") {
            logger.debug("Admin-effected crash.");
            //cluster.worker.kill();
        } else if (reqUrl === "/admin/error/500/") {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write("<p>Hey Admin. What's up?</p>");
            res.write(`<p>Here's your ${'500'} error.</p>`);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<p>Hey Admin. What's up?</p>");
            res.write(`<p>Here's your ${'200'} response.</p>`);
        }
        res.end();
    });

    app.get('/*', async (req: express.Request, res: express.Response) => {
        let query = url.parse(req.url, true);
        let fileName = path.join(PUBLIC_DIR, query.pathname);
        if(path.parse(fileName).ext === "") {
            fileName += 'index.html'
        }
        fileName = path.resolve(fileName);
        try {
            let contents = await fs.readFile(fileName);
            let contentType: string
            switch(path.parse(fileName).ext) {
                case '.html': contentType = 'text/html';
                break;

                case '.css': contentType = 'text/css';
                break;

                case '.js': contentType = 'application/javascript';
                break;

                case '.gif': contentType = 'image/gif';
                break;

                case '.jpeg':
                case '.jpg': contentType = 'image/jpeg';
                break;

                case '.png': contentType = 'image/png';
                break;

                case '.svg': contentType = 'image/svg+xml';
                break;

                case '.pdf': contentType = 'application/pdf';
                break;

                default: throw Error('Unrecognized file type');
                break;
            }
            res.writeHead(200, {'Content-Type': contentType});
            res.write(contents);
        } catch (e) {
            let err = e as Error
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write("<p>404 - Not Found</p>");
                res.write("<p>Sorry 'bout that.'</p>");
                logger.debug(JSON.stringify(fileName));
                logger.debug(err.message);
            }
        }
        res.end();
    });
};
