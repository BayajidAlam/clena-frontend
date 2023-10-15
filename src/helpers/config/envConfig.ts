export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
};

export const getImgBBUrl = (): string => {
  return process.env.Imgbbe_key || "3e7c5c0cd1ac6a06dc8f8e896ce3a95c";
};
