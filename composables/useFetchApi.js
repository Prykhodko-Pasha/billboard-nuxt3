export default (url, options = {}) => {
  const { user } = useUser();

  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorisation: `Bearer ${user.value.accessToken}`,
    },
  });
};
