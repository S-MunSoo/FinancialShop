import React from "react";
import {
  MDBCol,
  MDBCardGroup,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
} from "mdb-react-ui-kit";

type PropsFunction = {
  recipe: any;
};

const Card = ({ recipe }: PropsFunction) => {
  return (
    <>
      <MDBCol>
        <MDBCardGroup>
          <MDBCard>
            <MDBCardImage
              src={recipe.image}
              alt={recipe.label}
              position="top"
              style={{ cursor: "pointer" }}
            />
            <MDBCardBody>
              <h5 className="fw-bold">{recipe.label}</h5>
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBCol>
    </>
  );
};

export default Card;
