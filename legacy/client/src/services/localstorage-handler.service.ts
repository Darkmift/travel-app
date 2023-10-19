const LocalStorageService = {
  get(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (!value) throw new Error('No item found');
      return JSON.parse(value).data;
    } catch (error) {
      console.log('🚀 ~ file: LocalStorageService.ts:7 ~ get ~ error', error);
      return null;
    }
  },
  set(key: string, payload: unknown): unknown {
    return localStorage.setItem(key, JSON.stringify({ data: payload }));
  },
  delete(key: string) {
    localStorage.removeItem(key);
  },
};

export default LocalStorageService;
