from ultralytics import YOLO
import math
import matplotlib.pyplot as plt

model=YOLO('models/best.pt')

results = model('test',save=True)
res =[]

for result in results:
    boxes = result.boxes.cpu().numpy()
    res.append(boxes.xywh)

diameters =[]

for i in res:
    for d in i:

        
        x_cor1 =  d[0]-d[2]/2
        x_cor2 =  d[0]+d[2]/2

        y_cor1 =  d[1]+d[3]/2
        y_cor2 =  d[1]-d[3]/2

        diameter = math.sqrt(pow((x_cor2-x_cor1),2)+pow((y_cor2-y_cor1),2))
        diameters.append(diameter)

neem=0
pipran=0
raintree=0


for i, d in enumerate(diameters):
    if i<134:
        d= int(d)
            # print(d in range(150,190))
        if d in range(150,190):
            pipran=pipran+1 
        elif d in range(73,150):
            raintree=raintree+1
        elif d in range(40, 203):
            neem=neem+1
            #  print(d)
bar_data = [neem,pipran,raintree]
# print("neem : " ,neem)
# print("raintree : " ,raintree)
# print("pipran: " ,pipran)
print(bar_data)

# plt.bar(["neem","pipran","raintree"],bar_data)
# plt.title("Number of trees per species")
# plt.xlabel("Species")
# plt.ylabel("Number of Trees")
# plt.show()

