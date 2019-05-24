# Python

 - Write a README file with some instructions to run the api and the tests
 - Make tests for all the APIs and methods. If you have to call to external APIs you must mock it in the unittest and make the calls in the integration tests.
 - Handle the errors in the appropriate way
 - The coverage should be over 85%

## Create rest API with flask and SQLAlchemy for the user model

### APIs

#### Registration

- **URL:** /api/v1/signup
- **Input:** Username, Password, Name, Surname, Email


#### Login (JWT)

- **URL:** /api/v1/signin
- **Input:** Username or email, Password

#### Logout (JWT) - Revoke token:

- **URL:** /api/v1/signout
- **PRE:** Needs login
- **Input:** Username or email, Password

#### Load csv file:

- **URL:** /api/v1/upload
- **PRE:** Needs login
- **Input:** csv file


#### External API, call to (call to [https://restcountries.eu/rest/v2/all](https://restcountries.eu/rest/v2/all)):

- **URL:** /api/v1/countries/population
- **PRE:** Needs login
- **RETURN:**
```json
{
  "country_name": "population"
}
```


#### External API, Create CSV file with the next columns (call to [https://restcountries.eu/rest/v2/all](https://restcountries.eu/rest/v2/all)):
- **URL:** /api/v1/countries/csv
- **PRE:** Needs login
- **CSV FIELDS:**
  - name
  - capital
  - region
  - lat
  - long
  - population
  - alpha3Code

#### External API,  Create PDF file with the next columns in a table (call to [https://restcountries.eu/rest/v2/all](https://restcountries.eu/rest/v2/all)):
- **URL:** /api/v1/countries/pdf
- **PRE:** Needs login
- **TABLE fields:**
  - name
  - capital
  - region
  - lat
  - long
  - population
  - alpha3Code
 
 ---
 ## Dockerize the application
 
Create a dockerfile and add some intructions in the README to run it.
Use an appropriate server to run the application in a production environment.
Assumes that the docker it is going to use in a production environment and add only the necessary files and configuration to that purpose.
 
 
 
 
 
