import { useEffect, useState } from "react";
import { useGetRecipesMutation } from "./services/recipeApi";
import {
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [health, setHealth] = useState("vegan");
  const [show, setShow] = useState(false);
  const [recipe, setRecipe] = useState({});

  // 해당 쿼리를 사용하여 query, health 전달 + 레시피 기져오기
  const [getRecipes, { isLoading, data }] = useGetRecipesMutation();

  useEffect(() => {
    getFoodRecipes();
  }, [query, health]);

  const getFoodRecipes = async () => {
    await getRecipes({ query, health });
  };

  const onSearchHandler = () => {
    setQuery(value);
    // 검색 후 입력 필드 지우기
    setValue("");
  };

  return (
    <div className="main-container">
      <MDBNavbar light bgColor="light">
        <MDBContainer>
          <h5 className="fw-bold mt-2">🍔 Food Recipe App</h5>
        </MDBContainer>
      </MDBNavbar>
      <div className="row g-1 align-items-center mt-2">
        <MDBInput
          wrapperClass="col-auto"
          label="Search Recipe"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="col-auto">
          <MDBBtn onClick={onSearchHandler}>Search</MDBBtn>
        </div>
      </div>
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {data?.hits?.map((item: any) => (
          <Card recipe={item.recipe} />
        ))}
      </MDBRow>
    </div>
  );
}

export default App;
