export const parseIdFromUrl = (url: string) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
}