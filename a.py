import random

a = random.randint(0,100)
while True:
    b = int(input())
    if a== b:
        print("yes!")
        break
    elif a > b:
         print("low")
    else:
        print("high")