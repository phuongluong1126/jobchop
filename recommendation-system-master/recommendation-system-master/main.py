from flask import Flask, json, jsonify
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from recommend_system_package import contented_base
from recommend_system_package import collab_filtering
from function_package import read_data_function
from craw_data_package import itviec, vietnamwork
import pandas as pd
from csv import writer
# matrix_ingredients = read_data_function.get_dataframe_ratings_base('dataset/ingredients.base')
# cf_ingredients = collab_filtering.CF(matrix_ingredients, k=2, uuCF=1)
# cf_ingredients.fit()

# matrix_recipes = read_data_function.get_dataframe_ratings_base('dataset/recipes.base')
# cf_recipes = collab_filtering.CF(matrix_recipes, k=2, uuCF=1)
# cf_recipes.fit()

def GetSimilarRecipeRS(skill):
    with open(r'D:\projects\jobchop\recommendation-system-master\recommendation-system-master\dataset\recipes.csv', 'a', newline='') as f_object:  
        writer_object = writer(f_object)
        writer_object.writerow([9999,"User",skill])  
        f_object.close()
    cb_recipes = contented_base.CB(r'D:\projects\jobchop\recommendation-system-master\recommendation-system-master\dataset\recipes.csv')
    cb_recipes.fit()
    listRecipe = cb_recipes.recommend_top("User",25)
    print(len(listRecipe))
    jsonList = []
    for _ in listRecipe:
        jsonList.append({"id": _[0], "similar":round(_[1],2)})
    f = open(r'D:\projects\jobchop\recommendation-system-master\recommendation-system-master\dataset\recipes.csv', "r+")
    lines = f.readlines()
    lines.pop()
    f = open(r'D:\projects\jobchop\recommendation-system-master\recommendation-system-master\dataset\recipes.csv', "w+")
    f.writelines(lines)
    return jsonList

def GetSimilarRecipeRS2(title):
    cb_recipes = contented_base.CB(r'D:\projects\jobchop\recommendation-system-master\recommendation-system-master\dataset\recipes.csv')
    cb_recipes.fit()
    listRecipe = cb_recipes.recommend_top(title,25)
    print(len(listRecipe))
    jsonList = []
    for _ in listRecipe:
        jsonList.append({"id": _[0], "similar":round(_[1],2)})
    return jsonList

app = Flask(__name__)
api = Api(app)

video_put_args = reqparse.RequestParser()
video_put_args.add_argument("skill", type=str, help="skill of user", required=True)

video_put_args2 = reqparse.RequestParser()
video_put_args2.add_argument("title", type=str, help="title of job", required=True)

resource_fields = {
	'skill': fields.String,
}

resource_fields2 = {
	'title': fields.String,
}

class GetAll(Resource):
    def get(self):
        df = pd.read_csv(r'D:\projects\jobchop\recommendation-system-master\recommendation-system-master\dataset\data.csv', sep='\t', encoding='utf-8') 
        df = df.fillna("")
        jsonList = [] 
        for index, row in df.iterrows():
            jsonList.append({
                "Id": row["Id"], 
            "Job Title": row["Job Title"], 
            "Company Name":row["Company Name"],
            "Province":row["Province"],
            "Location":row["Location"],
            "Salary":row["Salary"],
            "Job Desription":row["Job Desription"],
            "Requirements":row["Requirements"],
            "Benefits":row["Benefits"],
            "Link":row["Link"],
            "Logo":row["Logo"],
            "Time": row["Time"],
            })
        # return(jsonify(jsonList))
        response = jsonify(jsonList)

        response.headers.add('Access-Control-Allow-Origin', '*')

        return response

class GetList(Resource):
    def get(self):
        args = video_put_args2.parse_args()
        response = jsonify(GetSimilarRecipeRS2(args.title))

        response.headers.add('Access-Control-Allow-Origin', '*')

        return response

class Create(Resource):
    def get(self):
        args = video_put_args.parse_args()
        response = jsonify(GetSimilarRecipeRS(args.skill))

        response.headers.add('Access-Control-Allow-Origin', '*')

        return response
class GetCompany(Resource):
    def get(self):
        # df = pd.read_csv("dataset/dataCompany.csv", sep='\t', encoding='utf-8') 
        df = pd.read_csv(r'D:\projects\jobchop\recommendation-system-master\recommendation-system-master\dataset\dataCompany.csv', sep='\t', encoding='utf-8') 
        df = df.fillna("")
        jsonList = [] 
        for index, row in df.iterrows():
            jsonList.append({
            "ids": row["ids"], 
            "company": row["company"], 
            "slogan":row["slogan"],
            "logo":row["logo"],
            "member":row["member"],
            "calender":row["calender"],
            "ot":row["ot"],
            "country":row["country"],
            "typeCompany":row["typeCompany"],
            "agency":row["agency"],
            "overview":row["overview"],
            "why_you_work_here": row["why_you_work_here"],
            "key_skill":row["key_skill"],
            "description": row["description"],
            "address": row["address"],
            })
        response = jsonify(jsonList)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


api.add_resource(GetAll, "/getall")

api.add_resource(GetList, "/getlist")

api.add_resource(Create, "/search")

api.add_resource(GetCompany, "/getcompany")

if __name__ == "__main__":
    app.run(debug=True)
    # itviec.FetchData(1,2)
