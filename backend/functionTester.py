import requests

# account info
accUsername = "TESTUSER"
accPassword = "TESTPASSWORD"
accEmail = "TEST@TEST.com"
storedGameAccountId = 5589398
unstoredGameAccountId = 10605456
fakeGameAccountId = 99999999
adminUsername = 'admin'
adminPassword = 'adminpassword'

storedGameAccountNameHasLevel = "AutoNick"
storedGameAccountNameHasNoLevel = "Apstrom"
storedLevelId = 93988001
storedPlatformerLevelId = 104043964
unstoredLevelId = 28255647
unstoredLevelPlatformerId = 97459884
# TODO connect initialization sql file


print("\n\nFunction Tester")
print("Testing Create Account Function:")

### ------ ACCOUNT CREATION TESTS

print("Creating account without all headers present")
test = requests.post("http://localhost:5000/createaccount", headers={"Username": "testUserName"})
assert(test.status_code == 400)

print("Creating account with all headers except game account")
test = requests.post("http://localhost:5000/createaccount", headers={"Username": "testUserName", "Password": "password", "Email": "email@email.com"})
assert(test.status_code == 200)

print("Creating account with game id and existing gameAccount in table")
test = requests.post("http://localhost:5000/createaccount", headers={"Username": accUsername + "t", "Password": accPassword, "Email": accEmail, "GameAccountID": str(storedGameAccountId)})
assert(test.status_code == 200)

print("Attempt to create account that already exists")
test = requests.post("http://localhost:5000/createaccount", headers={"Username": accUsername + "t", "Password": accPassword, "Email": accEmail, "GameAccountID": str(storedGameAccountId)})
assert(test.status_code == 400)
assert(test.text == "user account already exists")

print("Create account with game id and existing gameAccount not in table but does exist on gdbrowser")
test = requests.post("http://localhost:5000/createaccount", headers={"Username": accUsername, "Password": accPassword, "Email": accEmail, "GameAccountID": str(unstoredGameAccountId)})
assert(test.status_code == 200)

print("Create account with game id with non existing gameAccount")
test = requests.post("http://localhost:5000/createaccount", headers={"Username": accUsername + "f", "Password": accPassword, "Email": accEmail, "GameAccountID": str(fakeGameAccountId)})
assert(test.status_code == 404)
assert(test.text == "Cant Find Game Account")

### ---- ACCOUNT LOGIN TESTS

print("Try Login with incorrect headers")
test = requests.post("http://localhost:5000/login", headers={"Username": "test"})
assert(test.status_code == 400)

print("Try Login with incorrect login info")
test = requests.post("http://localhost:5000/login", headers={"Username": accUsername+"dfd", "Password": accPassword})
assert(test.status_code == 404)

print("Try to login with correct information")
test = requests.post("http://localhost:5000/login", headers={"Username": accUsername, "Password": accPassword})
assert(test.status_code == 200)
assert(test.text != "")
token = test.text
print(token)

### ---- ADD RATING TESTS

print("Try to add rating with no token provided")
test = requests.post("http://localhost:5000/addRating")
assert(test.status_code == 400)
assert(test.text == "Token not provided")

print("Try to add rating with invalid token provided")
test = requests.post("http://localhost:5000/addRating", headers={"Token": token + "d"})
assert(test.status_code == 401)
assert(test.text == "Invalid Token")

print("Try to add rating with valid token not all form fields")
test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": storedLevelId})
assert(test.status_code == 400)
assert(test.text == "Invalid fields")

print("Try to add rating valid token invalid level ID")
test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": storedLevelId + 1, "Enjoyment": 5, "Difficultyrating": 5})
assert(test.status_code == 404)
assert(test.text == "level doesnt exist")

print("Try to add rating valid token valid non-platformer level Id but timerating provided")
test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": storedLevelId, "Enjoyment": 5, "Difficultyrating": 5, "Usertimerating": 120})
assert(test.status_code == 400)
assert(test.text == "Incorrect Level Type for Rating Submission")

print("Try to add rating valid token valid non-platformer level Id valid data")
test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": storedLevelId, "Enjoyment": 5, "Difficultyrating": 5})
assert(test.status_code == 200)

print("Try to add rating valid token vaid platformer level id but no timerating provided")
test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": storedPlatformerLevelId, "Enjoyment": 5, "Difficultyrating": 5})
assert(test.status_code == 400)
assert(test.text == "Incorrect Level Type for Rating Submission")

print("Try to add rating valid token valid platformer level id valid data")
test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": storedPlatformerLevelId, "Enjoyment": 5, "Difficultyrating": 5, "Usertimerating": 120})
assert(test.status_code == 200)

print("try to add duplicate rating")
test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": storedPlatformerLevelId, "Enjoyment": 5, "Difficultyrating": 5, "Usertimerating": 120})
assert(test.status_code == 400)
assert(test.text == "Rating already created for this level")

### ---- DELETE RATING TESTS

print("try to delete rating no token provided")
test = requests.post("http://localhost:5000/deleteRating")
assert(test.status_code == 400)
assert(test.text == "Token not provided")

print("try to delete rating invalid token provided")
test = requests.post("http://localhost:5000/deleteRating", headers={"Token": token + "t"})
assert(test.status_code == 401)
assert(test.text == "Invalid Token")

print("try to delete rating valid token level rating does not exist")
test = requests.post("http://localhost:5000/deleteRating", headers={"Token": token}, data={"Levelid": storedLevelId + 1})
assert(test.status_code == 404)
assert(test.text == "Rating does not exist")

print("try to delete rating valid token valid level rating")
test = requests.post("http://localhost:5000/deleteRating", headers={"Token": token}, data={"Levelid": storedLevelId})
assert(test.status_code == 200)

### ---- GET RATINGS TEST

print("try to get ratings where levelId not provided")
test = requests.get("http://localhost:5000/getRatings")
assert(test.status_code == 400)
assert(test.text == "level id not provided")

print("try to get ratings where levelid does not exist")
test = requests.get("http://localhost:5000/getRatings", headers={"Levelid": str(storedLevelId + 3)})
assert(test.status_code == 404)
assert(test.text == "level does not exist")

print("try to get ratings where levelid does exist")
test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": storedLevelId, "Enjoyment": 5, "Difficultyrating": 5})
test = requests.get("http://localhost:5000/getRatings", headers={"Levelid": str(storedLevelId)})
assert(test.status_code == 200)
assert(test.text != "")
print(test.text)

### ---- GET LEVEL INFORMATION TEST

print("try to get level information level id not included")
test = requests.get("http://localhost:5000/getLevelInformation")
assert(test.status_code == 400)
assert(test.text == "level id not provided")

print("try to get level information level id does not exist")
test = requests.get("http://localhost:5000/getLevelInformation", headers={"Levelid": str(storedLevelId + 3)})
assert(test.status_code == 404)
assert(test.text == "level does not exist")

print("try to get level information level id does exist")
test = requests.get("http://localhost:5000/getLevelInformation", headers={"Levelid": str(storedLevelId)})
assert(test.status_code == 200)
print(test.text)

### ---- ADD LEVEL TEST

print("try to add level no token")
test = requests.post("http://localhost:5000/admin/addLevel")
assert(test.status_code == 400)
assert(test.text == "Token not provided")


print("try to add level invalid token")
test = requests.post("http://localhost:5000/admin/addLevel", headers={"Token": token + "a"})
assert(test.status_code == 401)
assert(test.text == "Invalid Token")

print("try to add level not admin")
test = requests.post("http://localhost:5000/admin/addLevel", headers={"Token": token})
assert(test.status_code == 403)
assert(test.text == "Admin permission required")

# generate a token for an admin account
adminLogin = requests.post("http://localhost:5000/login", headers={"Username": adminUsername, "Password": adminPassword})
assert(adminLogin.status_code == 200)
adminToken = adminLogin.text

print("try to add level levelid not provided")
test = requests.post("http://localhost:5000/admin/addLevel", headers={"Token": adminToken})
assert(test.status_code == 400)
assert(test.text == "Level id not provided")

print("try to add level levelId already in database")
test = requests.post("http://localhost:5000/admin/addLevel", headers={"Token": adminToken, "Levelid": str(storedLevelId)})
assert(test.status_code == 400)
assert(test.text == "level already in database")

print("try to add level levelId not found on gdbrowser")
test = requests.post("http://localhost:5000/admin/addLevel", headers={"Token": adminToken, "Levelid": "111111"})
assert(test.status_code == 404)
assert(test.text == "Level not found")

print("try to add level levelId is on gdbrowser is not platformer")
test = requests.post("http://localhost:5000/admin/addLevel", headers={"Token": adminToken, "Levelid": str(unstoredLevelId)})
assert(test.status_code == 200)

print("try to add levelId is on gdbrowser is platformer")
test = requests.post("http://localhost:5000/admin/addLevel", headers={"Token": adminToken, "Levelid": str(unstoredLevelPlatformerId)})
assert(test.status_code == 200)
### ---- FILTER LEVEL TEST

print("try to add level no parameters provided")
test = requests.get("http://localhost:5000/filterLevel")
assert(test.status_code == 400)
assert(test.text == "no search parameters provided")

print("try to add level by creator name does not exist")
test = requests.get("http://localhost:5000/filterLevel", headers={"Creatorname": storedGameAccountNameHasNoLevel + "d"})
assert(test.status_code == 404)
assert(test.text == "creator name not found")

print("try to add level by creator name does exist but has no levels")
test = requests.get("http://localhost:5000/filterLevel", headers={"Creatorname": storedGameAccountNameHasNoLevel})
assert(test.status_code == 200)
assert(test.text == "[]\n")

print("try to add level by creator name does exist has levels")
test = requests.get("http://localhost:5000/filterLevel", headers={"Creatorname": storedGameAccountNameHasLevel})
assert(test.status_code == 200)
assert(len(eval(test.text)) == 1)
assert(eval(test.text)[0]["levelName"] == "Enjoying The Sun")

print("try to add level by rating no results")
test = requests.get("http://localhost:5000/filterLevel", headers={"Lowdifficultyrating": "6", "Highdifficultyrating": "8"})
assert(test.status_code == 200)
assert(test.text == "[]\n")

print("try to add level by rating")
test = requests.get("http://localhost:5000/filterLevel", headers={"Lowdifficultyrating": "2", "Highdifficultyrating": "8"})
assert(test.status_code == 200)
assert(len(eval(test.text)) == 2)
