# node18-pages

Node 18 api routes are difficult to test alongside their browser code. This
is because Node 18 uses a new fetch implementation
[undici](https://www.npmjs.com/package/undici) that most mocking libraries
don't support out of the box.

This example uses MSW@2.x.x (@next) to use the native fetch Request and Response
objects for mocking.

Jest projects were attempted to be used here, but Next.js's jest config
transformer didn't know how to handle projects.

Instead, this uses two different jest configurations, one for the browser,
and one for node.
