declare module 'browser-fingerprint' {
  type FingerprintGenerator = (options?: Record<string, unknown>) => string;
  const generator: FingerprintGenerator;
  export default generator;
}
