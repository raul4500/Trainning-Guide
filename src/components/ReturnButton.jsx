import { Link } from 'react-router';
import "./ReturnButton.css"

function ReturnButton() {
  return (
    <>
    <Link to="/" className="return">
      <span>Voltar</span>
    </Link>
    </>
  );
}

export default ReturnButton;
