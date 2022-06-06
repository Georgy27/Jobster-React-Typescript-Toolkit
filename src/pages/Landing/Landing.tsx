import main from "../../assets/images/main.svg";
import Wrapper from ".";
import { Logo } from "../../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              Job <span>tracking </span>App
            </h1>
            <p>
              I'm baby literally tattooed iPhone photo booth chillwave flannel
              disrupt hoodie chambray sartorial DSA letterpress. Sriracha
              letterpress XOXO gentrify twee lumbersexual. Kinfolk palo santo
              jianbing pok pok.{" "}
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img"></img>
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
