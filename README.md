# keel-app ⚓

A starter application for the [Keel framework](https://github.com/shaferllc/keel).
Clone it, install, and start building — you get the framework as a dependency,
so `npm update` pulls in core improvements.

## Quick start

```bash
git clone https://github.com/shaferllc/keel-app.git my-app
cd my-app
npm install
cp .env.example .env
npm run dev          # http://localhost:3000
```

```bash
curl localhost:3000/            # HomeController@index (JSON)
curl localhost:3000/welcome     # a rendered JSX view
curl localhost:3000/hello/Tom   # route parameter
```

## The console

Your app ships its own console at `bin/console.ts` — extend it freely.

```bash
npm run keel routes                 # list routes
npm run keel serve --port 8080      # start on a chosen port
npm run keel make:controller Post   # -> app/Controllers/PostController.ts
npm run keel make:provider Billing  # -> app/Providers/BillingServiceProvider.ts
npm run keel make:middleware Auth   # -> app/Http/Middleware/authMiddleware.ts
```

## Layout

```
app/
├─ Controllers/            Resolved from the container (dependency injection)
├─ Providers/              Register + wire services
└─ Http/
   ├─ Kernel.ts            Global middleware
   └─ Middleware/
bootstrap/                 createApplication(): boots providers, loads routes
config/                    config/app.ts -> config('app.*')
resources/views/           JSX view components
routes/web.ts              Route definitions
bin/console.ts             Your app's console
```

## Getting core updates

Keel is a dependency (`@shaferllc/keel`). To pull the latest compatible core:

```bash
npm update @shaferllc/keel
```

Bump the major range in `package.json` when you're ready to adopt a new major.

## Documentation

Framework docs live in the [Keel repo](https://github.com/shaferllc/keel/tree/main/docs):
container, providers, configuration, routing, views, middleware, and the console.

## License

MIT © 2026 Tom Shafer
