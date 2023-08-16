import pandas
import csv
from pymongo import MongoClient

mongo_str = "mongodb+srv://hdrproject:50230@cluster0.ktm1unb.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_str)

db = client.HDRProjecct
datas = db.studentdatas

for i in range(1,7):
    if i not in [4,5,6]:
        for j in range(1,9):
            try:
                R2=pandas.DataFrame(pandas.read_excel(f"M{i}-2566.xlsx",sheet_name=f"{i}0{j}")).to_dict()
                print(R2)
                print(f"======================M.{i}/{j}============================")
                R2L = len(R2["เลขที่"])
                for instart in range(R2L):
                    data = {
                        "Room":int(f"{i}0{j}"),
                        "Number":int(R2['เลขที่'][instart]),
                        "StudentNumber":int(R2['เลขประจำตัว'][instart]),
                        "StudentName":f"{R2['ชื่อ - นามสกุล'][instart]} {R2['Unnamed: 3'][instart]} {R2['Unnamed: 4'][instart]}",
                        "Times":0
                    }
                    datas.insert_one(data)
                print("============================================================")
            except:
                pass
    if i in [4,5,6]:
        for j in range(1,9):
            try:
                R2=pandas.DataFrame(pandas.read_excel(f"M{i}-2566.xlsx",sheet_name=f"{i}0{j}")).to_dict()
                print(R2)
                print(f"======================M.{i}/{j}============================")
                R2L = len(R2["เลขที่ "])
                for instart in range(R2L):
                    data = {
                        "Room":int(f"{i}0{j}"),
                        "Number":int(R2['เลขที่ '][instart]),
                        "StudentNumber":int(R2['เลขประจำตัว'][instart]),
                        "StudentName":f"{R2['ชื่อ - สกุล'][instart]} {R2['Unnamed: 3'][instart]} {R2['Unnamed: 4'][instart]}",
                        "Times":0
                    }
                    datas.insert_one(data)
                print("============================================================")
            except:
                pass