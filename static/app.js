
var React = require('react');
var createReactClass = require('create-react-class');

var Shared = require('./shared');

module.exports = createReactClass({
  getInitialState: function() {
    return {
      recipes: [],
    };
  },
  loadRecipes: function(recipes) {
    this.setState({
      recipes: recipes,
    });
  },
  componentDidMount: function() {
    if (window.database != null) {
      var that = this;
      return window.database.ref('/recipes').once('value').then(function(recipes) {
        that.loadRecipes(recipes.val());
      });
    }
  },
  render: function() {
    var bodyContentStyle = Object.assign({}, Shared.StyleZDepth1 ,{
      backgroundColor: 'white',

      padding: '8px',
      marginTop: '6px',
      minHeight: '300px',
    });

    var itemStyle = {
      display: 'flex',
      justifyContent: 'center',
    };
    var leftSubitemStyle = {
      minWidth: '30%',
      textAlign: 'right',
      marginRight: '20px',
    };
    var rightSubitemStyle = {
      flexGrow: '1',
    };

    var recipes = [];
    for (var recipeKey in this.state.recipes) {
      if (this.state.recipes.hasOwnProperty(recipeKey)) {
        var recipe = this.state.recipes[recipeKey];
        var ingredients = [];
        for (var i = 0; i < recipe.ingredients.length; i++) {
          var ingredient = recipe.ingredients[i];
          var measurement = ingredient.measurement;
          if (ingredient.preparation != null) {
            measurement += ", " + ingredient.preparation;
          }

          ingredients.push(
            <div style={itemStyle}>
              <div style={leftSubitemStyle}>{measurement}</div>
              <div style={rightSubitemStyle}><b>{ingredient.title}</b></div>
            </div>);
        }

        var steps = [];
        for (var i = 0; i < recipe.steps.length; i++) {
          var step = recipe.steps[i];
          steps.push(
            <div style={itemStyle}>
              <div style={leftSubitemStyle}><b>{step.title}</b></div>
              <div style={rightSubitemStyle}>{step.description}</div>
            </div>);
        }

        recipes.push(
          <div>
            <h2>{recipe.title}</h2>
            <p><b>Ingredients</b></p>
            {ingredients}
            <p><b>Steps</b></p>
            {steps}
          </div>);
      }
    }

    return (
      <div>
        <Shared.Nav />
        <div style={bodyContentStyle}>{recipes}</div>
      </div>
    )
  }
});
