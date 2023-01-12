export default function useUser() {
  const user = useState("user", () => null);

  const setUser = (userData) => {
    user.value = userData;
    console.log("useUser user.value :>> ", user.value);
  };

  return { user, setUser };
}
