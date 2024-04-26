# GDapp

## Backend Setup Procedure
- Install MySql [here](https://dev.mysql.com/downloads/installer/) and keep track of the root password (ELABORATE MORE HERE)
- If it hasn't been started, launch services.msc an start the MySQL service
- Make sure that the python module mysql-connector is NOT installed 
```pip uninstall mysql-connector```
- Install required python dependencies 
```pip install -r requirements.txt```
- Run database initialization script
```python DatabaseSetup.py```
- Run backend
```python main.py```
- In a new window, run the backend tester script
```python functionTester.py```
- If there are no errors, then the backend is ready. Keep main.py running

## Frontend Setup Procedure