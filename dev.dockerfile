FROM hayd/deno:alpine-1.0.0

ENV PATH="/root/.deno/bin:$PATH"
RUN deno install -A -f --unstable https://deno.land/x/denom/denom.ts

ENTRYPOINT [ "denom" ]
