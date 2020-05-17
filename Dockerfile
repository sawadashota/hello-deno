FROM hayd/deno:alpine-1.0.0

WORKDIR /app
COPY . ./

RUN deno bundle app.ts app.bundle.js

CMD ["deno", "run", "--allow-net", "--allow-read", "app.bundle.js"]
