export default function isAuthenticated() {
  return !!useState("user").value;
}
