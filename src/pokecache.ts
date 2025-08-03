export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val,
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val as T;
  }

  #reap() {
    const now = Date.now();
    for (let key of this.#cache.keys()) {
      const entry = this.#cache.get(key);
      if (!entry) continue;
    //   console.log("key", key);
      if (entry.createdAt <= now - this.#interval) {
        // console.log("called");
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
