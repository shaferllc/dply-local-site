import { ServiceProvider } from "@shaferllc/keel/core";

/**
 * The primary application provider. Bind your services in register(),
 * wire them together in boot().
 */
export class AppServiceProvider extends ServiceProvider {
  register(): void {
    // this.app.singleton(Clock, () => new Clock());
  }

  boot(): void {
    // Runs after all providers have registered.
  }
}
