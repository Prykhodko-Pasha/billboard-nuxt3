export default function useLoading() {
  const loading = useState("loading", () => true);

  const setLoading = (status) => {
    loading.value = status;
    console.log("setLoading loading.value :>> ", loading.value);
  };

  return { loading, setLoading };
}
