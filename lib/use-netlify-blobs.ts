/**
 * Use Netlify Blobs for user/purchase storage. Netlify Next.js runs on AWS Lambda,
 * where the deploy root (e.g. /var/task) is read-only — writing data/users.json
 * fails with EROFS unless we use Blobs.
 *
 * CONTEXT / NETLIFY may be missing in the serverless runtime, so we also detect Lambda.
 */
export function useNetlifyBlobs(): boolean {
  if (process.env.FORCE_LOCAL_FILE_STORE === "true") {
    return false;
  }
  if (
    process.env.AWS_LAMBDA_FUNCTION_NAME != null &&
    process.env.AWS_LAMBDA_FUNCTION_NAME !== ""
  ) {
    return true;
  }
  if (process.env.AWS_EXECUTION_ENV?.startsWith("AWS_Lambda")) {
    return true;
  }
  const ctx = process.env.CONTEXT?.trim();
  if (ctx && ctx.length > 0) {
    return true;
  }
  if (process.env.NETLIFY === "true") {
    return true;
  }
  try {
    if (process.cwd().startsWith("/var/task")) {
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}
