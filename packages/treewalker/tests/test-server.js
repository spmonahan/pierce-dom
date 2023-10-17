// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const express = require("express");
const { join } = require("path");


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

    app.use("/pages", express.static(join(__dirname, "pages")));
    app.use("/webcomponents", express.static(join(__dirname, "webcomponents")));
    
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