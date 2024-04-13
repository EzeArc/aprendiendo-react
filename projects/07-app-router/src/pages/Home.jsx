import { Link } from "../components/Link";

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es la homepage</p>
      <Link to="/about">Ir a nosotros</Link>
    </>
  );
}
