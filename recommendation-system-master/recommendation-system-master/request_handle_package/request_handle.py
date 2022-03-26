from recommend_system_package import contented_base
from recommend_system_package import collab_filtering
from function_package import read_data_function
from flask import jsonify

matrix_recipes = read_data_function.get_dataframe_ratings_base('./dataset/recipes.base')
cf_recipes = collab_filtering.CF(matrix_recipes, k=2, uuCF=1)
cf_recipes.fit()

matrix_ingredients = read_data_function.get_dataframe_ratings_base('./dataset/ingredients.base')
cf_ingredients = collab_filtering.CF(matrix_recipes, k=2, uuCF=1)
cf_ingredients.fit()

cb_recipes = contented_base.CB('./dataset/recipes.csv')
cb_recipes.fit()

def ConvertJson(originList):
        jsonList = []
        for _ in originList:
            jsonList.append({"id": _[0], "similar":round(_[1],2)})
        return jsonify(jsonList)

def GetSimilarRecipe(id, quantity):
    listRecipe = cb_recipes.recommend_top(id,quantity)
    return ConvertJson(listRecipe)

def GetRecipeOtherUserLike(id, quantity):
    listRecipe = cf_recipes.recommend_top(id,quantity)
    return ConvertJson(listRecipe)

def GetIngreOtherUserLike(id, quantity):
    listIngredient = cf_ingredients.recommend_top(id,quantity)
    return ConvertJson(listIngredient)

if __name__ == "__main__":
    print(GetSimilarRecipe(1, 10))