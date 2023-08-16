from pymongo import MongoClient
import pandas


mongo_str = "mongodb+srv://hdrproject:50230@cluster0.ktm1unb.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_str)

db = client.HDRProjecct
datas = db.teacherdata

R2=pandas.DataFrame(pandas.read_excel(f"DBTeacher.xlsx")).to_dict()
print(len(R2["ลำดับที่"]))

for i in range(len(R2["ลำดับที่"])):
    try:
        data = {
            "TeacherName":' '.join(R2["ชื่อ - นามสกุล"][i].split()),
            "User":R2["User"][i],
            "Password":str(R2["Password"][i])
        }
    except:
        data = {
            "TeacherName":' '.join(R2["ชื่อ - นามสกุล"][i].split()),
            "User":R2["User"][i],
            "Password":str(R2["Password"][i])
        }
    print(data)
    datas.insert_one(data)