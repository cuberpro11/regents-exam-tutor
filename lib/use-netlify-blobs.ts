/**
 * Netlify sets CONTEXT (production | deploy-preview | branch-deploy) for deploys.
 * NETLIFY may be "true" during CI but is not always set in the serverless runtime,
 * so checking only NETLIFY !== "true" falls back to fs writes and fails (EROFS).
 */
export function useNetlifyBlobs(): boolean {
  if (process.env.FORCE_LOCAL_FILE_STORE === "true") {
    return false;
  }
  const ctx = process.env.CONTEXT?.trim();
  if (ctx && ctx.length > 0) {
    return true;
  }
  return process.env.NETLIFY === "true";
}
