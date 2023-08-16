from pymongo import MongoClient
import pandas


mongo_str = "mongodb+srv://hdrproject:50230@cluster0.ktm1unb.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_str)

db = client.HDRProjecct
datas = db.historiess

data = db.histories

for i in datas.find():
    print(i)
    data.insert_one(i)