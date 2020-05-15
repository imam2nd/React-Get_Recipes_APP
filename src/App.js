import React,{useEffect, useState} from 'react';
import Recipe from "./Recipes"
import './App.css';

const App = () => {
  const APP_ID = '2e32e850';
  const APP_KEY = '7debd13615d7f453cd07ebee1b3ed380';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
      getRecipies();
      console.log("query", query)
  }, [query]);


  const getRecipies = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits)
  };

  const updateSearch = e => {
      setSearch(e.target.value);
      console.log("updatesearch",search)
  }

  const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch("");
      console.log("getsearch",search)
  }
  return(
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input
              className="search-bar"
              type="text"
              value={search}
              onChange={updateSearch}
          />
          <button className="search-button" type="submit" value={search} onChange={updateSearch}>search</button>
        </form>
        {recipes.map(recipe =>(
            <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
            />
        ))}
      </div>
  )
}

export default App;
