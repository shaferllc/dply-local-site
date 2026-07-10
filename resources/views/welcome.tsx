// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";
import { Layout } from "./layout.js";

/** The welcome page — rendered by HomeController@welcome. */
export const WelcomePage: FC<{ appName: string }> = ({ appName }) => (
  <Layout title={appName}>
    <h1>⚓ {appName}</h1>
    <p>
      You're running a Keel app. This page is a JSX component in{" "}
      <code>resources/views/</code>, rendered through the <code>View</code>{" "}
      service.
    </p>
    <p>
      Edit <code>routes/web.ts</code> and <code>app/Controllers/</code> to build
      something.
    </p>
  </Layout>
);
