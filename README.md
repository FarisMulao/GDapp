# GDapp

## Backend Setup Procedure
- Install MySql [here](https://dev.mysql.com/downloads/installer/) . Make sure to perform a server installation. Try to keep most settings at their default (port 3306). Keep track of the root password.
- If it hasn't been started, launch services.msc and start the MySQL service.
- Make sure that the python module mysql-connector is NOT installed.
```pip uninstall mysql-connector```
- cd into the backend folder.
- Install required python dependencies. This may produce errors, but they will likely go away if the command is rerun.
```pip install -r requirements.txt```
- Run database initialization script.
```python DatabaseSetup.py```
- Run backend.
```python main.py```
- In a new window, run the backend tester script.
```python functionTester.py```
- If there are no errors, then the backend is ready. Keep main.py running.
- The functionTester script will insert admin credentials and some levels, so everything should be ready

## Frontend Setup Procedure
