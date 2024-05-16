import { Link } from "react-router-dom";

const Header = (props) => (<header>
        <nav>
          <Link to={"/user"}>User</Link><br/>
          <Link to={"/products"}>Products</Link><br/>
          <Link to={"/checkout"}>Checkout</Link><br/>
        </nav>
    </header>)

export default Header