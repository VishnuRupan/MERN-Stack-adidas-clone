import styled from "styled-components";
import { Link } from "react-router-dom";
import promo1 from "../img/promo1.jpg";
import promo2 from "../img/promo2.jpg";

const PromotionSection = () => {
  return (
    <PromoContainer>
      <div className="info">
        <h1> TRIO 21 SITEWIDE </h1>
        <h1> CLEARANCE </h1>
        <p> Shop now and save up to 50% off regular price clothing.</p>

        <div className="promo-btn">
          <Link className="btn btn-dark my-3" to="/men">
            SHOP MEN'S
          </Link>

          <Link className="btn btn-dark my-3" to="/women">
            SHOP WOMEN'S
          </Link>
        </div>
      </div>

      <div className="promo-img">
        <img className="promo1" src={promo1} alt="promo-image" />
        <img className="promo2" src={promo2} alt="promo-image" />
      </div>
    </PromoContainer>
  );
};

const PromoContainer = styled.div`
  min-height: 70vh;
  background: #eba17f;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5rem;

  @media (min-width: 1600px) {
    width: 100rem;
    margin: auto;
    min-height: 25rem;
  }

  @media only screen and (max-width: 800px) {
    padding: 2rem;
  }

  .promo-img {
    position: relative;
    img {
      width: 100%;
      height: 15rem;
      object-fit: cover;
    }

    .promo1 {
      margin-left: 1rem;
    }
  }

  .info {
    padding-right: 2rem;

    h1 {
      font-family: "Arimo", sans-serif;
      margin: 0rem;
      padding: 0rem !important;
      white-space: nowrap;
      font-size: 3rem;

      @media only screen and (max-width: 1024px) {
        font-size: 2rem;
      }

      @media only screen and (max-width: 500px) {
        white-space: normal;
        font-size: 1.5rem;
      }
    }

    p {
      color: black;
      padding: 1rem 0rem;
      font-size: 1.2rem;

      @media only screen and (max-width: 1024px) {
        font-size: 1rem;
      }

      @media only screen and (max-width: 500px) {
        font-size: 0.8rem;
      }
    }
  }

  .promo-btn {
    display: flex;
    flex-direction: column;
  }

  a {
    background: #202020;
    width: 10rem;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0rem;

    i {
      padding: 0rem 0.5rem;
    }

    &:hover {
      background: black;
    }
  }
`;

export default PromotionSection;
