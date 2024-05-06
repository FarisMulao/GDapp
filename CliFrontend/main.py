import requests
import json
import time

def getJsonFromRequest(text):
    try:
        data = json.loads(text)
    except:
        return False, []
    return True, data

def viewLevel():
    levelId = input("type in the ID of the level to look for")
    if not levelId.isnumeric():
        print("Invalid level ID!")
        return

    request = requests.get("http://localhost:5000/getLevelInformation", headers={"Levelid": levelId})
    if request.status_code == 404:
        print("Level id not found!")
        return
    if request.status_code == 200:
        success, content = getJsonFromRequest(request.text)
        if not success:
            print("Unknown error occured. Please try again.")
            return
        print(f"Level Name: {content['levelName']}")
        print(f"Creator Name: {content['creator_username']}")
        print(f"Difficulty: {content['difficulty']}")
        print(f"Distinction: {content['distinction']}")
        print(f"Level Length: {content['length']}")
        if content["is_platformer"] == 1:
            print("Level Type: Platformer")
            print(f"Average Completion Time: {content['avgTime']}")
        else:
            print("Level Type: Normal")
        print(f"Average Level Enjoyment: {content['avgEnjoyment']}")
        if content["wrUsername"] is not None:
            print(f"World Record Holder: {content['wrUsername']}")
            if content["is_platformer"] == 1:
                print(f"World Record Time: {content['wrTime']}")
        print(f"{len(content['songs'])} song(s) used.")
        for x in range(len(content['songs'])):
            print(f"Song {x + 1}: {content['songs'][x]['songName']} by {content['songs'][x]['artistName']}")
        return
    print("Unknown error occured. Please try again.")
    return

def viewReviews():
    levelId = input("type in the ID of the level to look at reviews for")
    if not levelId.isnumeric():
        print("Invalid level ID!")
        return

    request = requests.get("http://localhost:5000/getRatings", headers={"Levelid": levelId})
    if request.status_code == 404:
        print("Level id not found!")
        return
    if request.status_code == 200:
        success, content = getJsonFromRequest(request.text)
        if not success:
            print("Unknown error occured. Please try again.")
            return

        print(f"Found {len(content)} reviews3")
        for x in range(len(content)):
            print(f"Review From {content[x]['username']}:")
            print(f"\tRated Difficulty: {content[x]['difficulty']}")
            print(f"\tRated Enjoyment: {content[x]['enjoyment']}")
            if content[x]['userTimeRating'] is not None:
                print(f"\tRated Completion Time: {content[x]['userTimeRating']} seconds")
            print("")
        return
    print("Unknown error occured. Please try again.")
    return

def createAccount():
    username = input("Enter a unique username: ")
    password = input("input a password (must be secret): ")
    email = input("Enter your email: ")
    gameAccountId = input("If you have a in-game Geometry Dash account, enter the gameID to tie it to your account. Otherwise, just hit enter to continue\nGame Account ID: ")

    if gameAccountId == "":
        request = requests.post("http://localhost:5000/createaccount", headers={"Username": username, "Password": password, "Email": email})
    elif gameAccountId.isnumeric():
        request = requests.post("http://localhost:5000/createaccount", headers={"Username": username, "Password": password, "Email": email, "GameAccountID": gameAccountId})
    else:
        print("Invalid game account id provided")
        return

    if request.status_code == 400:
        print("Account with this username already exists. Please try a different username or login")
        return
    if request.status_code == 404:
        print("The game account ID provided could not be found. Please try again")
        return
    if request.status_code == 200:
        print("Account successfully created")
        return
    print("Unknown error occured. Please try again.")
    return

def loginAccount():
    username = input("Enter Username: ")
    password = input("Enter Password: ")

    request = requests.post("http://localhost:5000/login", headers={"Username": username, "Password": password})

    if request.status_code == 404:
        print("Username and Password combination was invalid. please try again")
        return False, "", ""
    if request.status_code == 200:
        print(f"You have successfully logged in as {username}")
        return True, username, request.text
    print("Unknown error occured. Please try again.")
    return False, "", ""

def createRating(token):
    if token is None:
        print("You must be logged in to perform this action")
        return

    isPlatformer = True
    levelId = input("Type in the level id to create a rating for: ")
    if not levelId.isnumeric():
        print("Invalid level ID!")
        return

    request = requests.get("http://localhost:5000/getLevelInformation", headers={"Levelid": levelId})
    if request.status_code == 404:
        print("Level id not found!")
        return
    if request.status_code == 200:
        success, content = getJsonFromRequest(request.text)
        if not success:
            print("Unknown error occured. Please try again.")
            return
        isPlatformer = not not content["is_platformer"]
    else:
        print("Unknown error occured. Please try again.")
        return


    enjoyment = input("Type in your enjoyment of the level [1-10]: ")
    if not enjoyment.isnumeric():
        print("Invalid enjoyment!")
        return
    enjoyment = int(enjoyment)
    if not 1 <= enjoyment <= 10:
        print("Enjoyment must be between 1 and 10 inclusive. please try again")
        return

    difficultyRating = input("Type in your difficulty rating for the level [1-10]: ")
    if not difficultyRating.isnumeric():
        print("Invalid difficulty rating!")
        return
    difficultyRating = int(difficultyRating)
    if not 1 <= difficultyRating <= 10:
        print("difficulty rating must be between 1 and 10 inclusive. please try again")
        return

    if isPlatformer:
        timeRating = input("Type in how long it took you to beat the level is seconds: ")
        if not timeRating.isnumeric():
            print("Invalid difficulty rating!")
            return
        timeRating = int(timeRating)
        test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": levelId, "Enjoyment": enjoyment, "Difficultyrating": difficultyRating, "Usertimerating": timeRating})
    else:
        test = requests.post("http://localhost:5000/addRating", headers={"Token": token}, data={"Levelid": levelId, "Enjoyment": enjoyment, "Difficultyrating": difficultyRating})

    if test.status_code == 401:
        print("Account Issue: Your login has likely expired. please login again to continue")
        return
    if test.status_code == 400:
        print("You have already submitted a rating for this level. If you would like to make changes to your rating, please delete your rating before creating a new one")
        return
    if test.status_code == 200:
        print("Rating created")
        return

def deleteRating(token):
    if token is None:
        print("You must be logged in to perform this action")
        return

    levelId = input("Enter level id to delete rating from: ")
    if not levelId.isnumeric():
        print("Invalid level ID!")
        return
    request = requests.post("http://localhost:5000/deleteRating", headers={"Token": token}, data={"Levelid": levelId})

    if request.status_code == 401:
        print("Account Issue: Your login has likely expired. please login again to continue")
        return
    if request.status_code == 404:
        print("You have not submitted a rating for this level, so there is nothing to delete")
        return
    if request.status_code == 200:
        print("Rating successfully deleted")
        return
    print("Unknown error occured. Please try again.")
    return

def addLevel(token):
    if token is None:
        print("You must be logged in to perform this action")
        return

    levelId = input("Type in level id to pull from GDBrowser.com: ")
    if not levelId.isnumeric():
        print("Invalid level ID!")
        return

    request = requests.post("http://localhost:5000/admin/addLevel", headers={"Token": token, "Levelid": levelId})

    if request.status_code == 403:
        print("You are not an admin!")
        return
    if request.status_code == 404:
        print("Level id not found on GDBrowser")
        return
    if request.status_code == 200:
        print("Level added")
        return
    print("Unknown error occured. Please try again.")
    return

def addSong(token):
    if token is None:
        print("You must be logged in to perform this action")
        return

    songId = input("Enter song ID as it appears in Geometry Dash: ")
    if not songId.isnumeric():
        print("Invalid Song ID!")
        return

    songName = input("Enter song name: ")
    songArtist = input("Enter song artist: ")

    request = requests.post("http://localhost:5000/admin/manualAddSong", headers={"Token": token, "Songid": songId, "Songname": songName, "Songartist": songArtist})

    if request.status_code == 403:
        print("You are not an admin!")
        return
    if request.status_code == 400:
        print("A song with the given ID already exists in the database")
        return
    if request.status_code == 200:
        print("Song has been successfully added")
        return
    print("Unknown error occured. Please try again.")
    return

def addSongLevel(token):
    if token is None:
        print("You must be logged in to perform this action")
        return

    levelId = input("Enter level Id: ")
    if not levelId.isnumeric():
        print("Invalid level id!")
        return

    songId = input("Enter song Id: ")
    if not songId.isnumeric():
        print("Invalid song id!")
        return

    request = requests.post("http://localhost:5000/admin/manualAddSongLevel", headers={"Token": token, "Levelid": levelId, "Songid": songId})
    if request.status_code == 403:
        print("You are not an admin!")
        return
    if request.status_code == 400:
        if request.text == "level id not found":
            print("level id not found")
        elif request.text == "song id not found":
            print("song id not found")
        else:
            print("relation already exists")
        return
    if request.status_code == 200:
        print("Song-Level relation successfully added")
        return
    print("Unknown error occured. Please try again.")
    return

def addWr(token):
    levelId = input("Enter level id to set world record of: ")
    if not levelId.isnumeric():
        print("Invalid level id!")
        return

    accountId = input("Enter game account id of world record holder (can be found in-game): ")
    if not levelId.isnumeric():
        print("Invalid account ID!")
        return

    wrTime = input("If the level is a platformer, enter the completion time (in seconds). Otherwise, just hit enter\nCompletion Time: ")
    if wrTime == "":
        request = requests.post("http://localhost:5000/admin/addWr", headers={"Token": token, "Levelid": levelId, "Wrid": accountId})
    elif wrTime.isnumeric():
        request = requests.post("http://localhost:5000/admin/addWr", headers={"Token": token, "Levelid": levelId, "Wrid": accountId, "Wrtime": wrTime})
    else:
        print("invalid world record time!")
        return

    if request.status_code == 403:
        print("You are not an admin!")
        return
    if request.status_code == 400:
        if request.text == "level id not found":
            print("level id not found")
        elif request.text == "Error finding account id":
            print("account id not found")
        else:
            print("relation already exists")
        return
    if request.status_code == 200:
        print("World Record Successfully added")
        return
    if request.status_code == 200:
        print("Song-Level relation successfully added")
        return
    print("Unknown error occured. Please try again.")
    return

def searchLevel():
    isCreatorSearch = False
    isDifficultySearch = False

    creatorSearch = input("Would you like to filter by the level creator's name? (y\\n): ")
    if creatorSearch == "y":
        isCreatorSearch = True
        creatorName = input("Enter creator name to search by: ")
    elif creatorSearch == "n":
        isCreatorSearch = False
    else:
        print("Invalid Option. Try Again!")
        return

    diffSearch = input("Would you like to filter by difficulty? (y\\n): ")
    if diffSearch == "y":
        isDifficultySearch = True
        lBound = input("Enter lower bound of difficulty to filter by [1-10]: ")
        if not lBound.isnumeric():
            print("Invalid Input: try again!")
            return
        lBound = int(lBound)
        if not 1 <= lBound <= 10:
            print("Invalid Input: try again!")
            return
        hBound = input("Enter upper bound of difficulty to filter by [1-10]: ")
        if not hBound.isnumeric():
            print("Invalid Input: try again!")
            return
        hBound = int(hBound)
        if not 1 <= hBound <= 10:
            print("Invalid Input: try again!")
            return

        if lBound >= hBound:
            print("lower bound must be smaller than upper bound!")
            return
    elif diffSearch == "n":
        isDifficultySearch = False
    else:
        print("Invalid Option. Try Again!")
        return

    headers = {}
    if isCreatorSearch:
        headers["Creatorname"] = creatorName
    if isDifficultySearch:
        headers["Lowdifficultyrating"] = str(lBound)
        headers["Highdifficultyrating"] = str(hBound)

    if not isCreatorSearch and not isDifficultySearch:
        headers["Lowdifficultyrating"] = str(0)
        headers["Highdifficultyrating"] = str(11)

    request = requests.get("http://localhost:5000/filterLevel", headers=headers)

    if request.status_code == 404:
        print("Creator Name was not found")
        return
    if request.status_code == 200:
        success, content = getJsonFromRequest(request.text[:-1])
        if not success:
            print("Unknown error occured. Please try again.")
            return
        print(f"Found {len(content)} Levels:")
        for x in range(len(content)):
            print(f"Level ID: {content[x]['levelId']}")
            print(f"\tLevel Name: {content[x]['levelName']}")
            print(f"\tLevel Difficulty: {content[x]['difficulty']}")
        return
    print("Unknown error occured. Please try again.")
    return

if __name__ == "__main__":
    time.sleep(0.5)
    loggedIn = False
    isAdmin = True
    username = None
    token = None

    # main loop
    while True:
        print("\n\nGeometry Dash Level Reviewer")
        if loggedIn:
            print(f"Logged in as: {username}")
        else:
            print("Logged in as: NOT LOGGED IN")

        print("What would you like to do?")
        print("1. Search for a level")
        print("2. View a level's information")
        print("3. View a level's reviews")
        print("4. Create an Account")
        print("5. Login to an Account")
        print("6. Create a level rating")
        print("7. Delete a level rating")
        if isAdmin:
            print("Admin Features:")
            print("8. Add a level into the database")
            print("9. Add a song to the database")
            print("10. Add a song-level relation to the database")
            print("11. Add a world record to the database")
        choice = input("Choice: ")
        if not choice.isnumeric():
            print("Not a number! try again")
            continue
        choice = int(choice)

        if choice == 1:
            searchLevel()
            continue
        if choice == 2:
            viewLevel()
            continue
        if choice == 3:
            viewReviews()
            continue
        if choice == 4:
            createAccount()
            continue
        if choice == 5:
            success, user, tok = loginAccount()
            if success:
                loggedIn = True
                username = user
                token = tok
            continue
        if choice == 6:
            createRating(token)
            continue
        if choice == 7:
            deleteRating(token)
            continue
        if choice == 8 and isAdmin:
            addLevel(token)
            continue
        if choice == 9 and isAdmin:
            addSong(token)
            continue
        if choice == 10 and isAdmin:
            addSongLevel(token)
            continue
        if choice == 11 and isAdmin:
            addWr(token)
            continue
        print("invalid choice! try again")