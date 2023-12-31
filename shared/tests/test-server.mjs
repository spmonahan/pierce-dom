// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));;
const packageUnderTest = process.argv[2];

let server;
const port = 3000;

const handleGracefulShutdown = arg => {
  console.log('Shutting down...');
  if (server && server.close) {
    console.log('Closing HTTP server');
    server.close();
    process.off('uncaughtException', handleGracefulShutdown);
  }

  if (arg instanceof Error) {
    console.error('Error', arg);
    process.exit(1);
  }
};

const startServer = (g) => {
    const app = express();

    // Use EJS templates
    app.set("views", join(__dirname, "views"));
    app.set("view engine", "ejs");

    app.get("/pages/:page.html", (req, res) => {
      res.render(`pages/${req.params.page}`, { packageUnderTest });
    });

    app.use("/packages", express.static(join(__dirname, "..", "..", "packages")));
    app.use("/pages", express.static(join(__dirname, "pages")));
    app.use("/webcomponents", express.static(join(__dirname, "webcomponents")));
    app.use("/js", express.static(join(__dirname, "js")));
    
    process.on('uncaughtException', handleGracefulShutdown);

    server = app.listen(port, () => {
        console.log("test server started!");
    });
};

const stopServer = () => {
    if (!server) {
        throw new Error('No server running!');
    }
    server.close();
}

startServer();