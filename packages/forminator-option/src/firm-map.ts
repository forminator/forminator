const isPrimitive = (value: unknown): boolean => Object(value) !== value;

export class MapGc {
  private map: Map<any, WeakRef<any>>;
  private iter?: Iterator<any>;
  private n: number;
  constructor(map: Map<any, WeakRef<any>>, n: number) {
    this.n = n;
    this.map = map;
  }

  private checkItem(key: any) {
    if (this.map.has(key) && this.map.get(key)?.deref() === undefined) {
      this.map.delete(key);
    }
  }
  gc() {
    const n = this.n;
    if (n > 0 && this.map.size < n) {
      return;
    }
    if (n < 0 || this.iter === undefined) {
      this.iter = this.map[Symbol.iterator]();
    }

    let i = n;
    while (i-- > 0) {
      const { value: keyValue, done } = this.iter.next();
      if (done) {
        this.iter = undefined;
        break;
      }
      const [key] = keyValue;
      this.checkItem(key);
    }
  }
}

export class FirmMap<K = any, V = any> {
  private primitiveCache: Map<any, WeakRef<any>>;
  private objectCache: WeakMap<any, any>;
  private gc: MapGc;

  constructor(entries?: readonly [K, V][] | null) {
    const primitiveEntries = entries
      ?.filter(([k]) => isPrimitive(k))
      .map(([k, v]) => [k, new WeakRef<any>(v)] as const);
    const objectEntries = entries?.filter(([k, v]) => !isPrimitive(k));
    this.primitiveCache = new Map<any, WeakRef<any>>(primitiveEntries);
    this.objectCache = new WeakMap<any, any>(objectEntries);
    this.gc = new MapGc(this.primitiveCache, 3);
  }

  delete(key: K): boolean {
    if (isPrimitive(key)) {
      return this.primitiveCache.delete(key);
    } else {
      return this.objectCache.delete(key);
    }
  }
  get(key: K): V | undefined {
    if (isPrimitive(key)) {
      return this.primitiveCache.get(key)?.deref();
    } else {
      return this.objectCache.get(key);
    }
  }
  has(key: K): boolean {
    if (isPrimitive(key)) {
      return this.primitiveCache.get(key)?.deref() !== undefined;
    } else {
      return this.objectCache.has(key);
    }
  }
  set(key: K, value: V): this {
    if (isPrimitive(key)) {
      this.primitiveCache.set(key, new WeakRef<any>(value));
      this.gc.gc();
    } else {
      this.objectCache.set(key, value);
    }
    return this;
  }
}
