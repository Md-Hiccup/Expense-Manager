# Expense-Manager
Creating totalExpense by adding Items and Price to get the total estimate cost of the month. Expense-Manager is build in nodejs with mysql using sequelize.


**Set Mysql sql_mode _ONLY_FULL_GROUP_BY = "";_**

## API Post request
*check in postman*
###### user request

1. **/auth/signup**

- name 
- email 

- password

2. **/auth/login**

- email
- password

3. **/addItems**

- name
- price
- uid
- dates ( yyyy-mm-dd )

4. **/itemList**

- uid

5. **/totalPrice**

- uid

6. **/dailyExp**

- uid
- dates ( yyyy-mm-dd )

7. **/monthlyExp**

- uid
- month ( mm )

8. **/weeklyExp**

- uid
- week

9. **/quarterExp**

- uid 
- quarter

# Sequelize Commands

1. **Initialize Sequelize**

- sequelize init
    - **it will create following folders**
        - config
        - models
        - migrations
        - seeders

2. **Create Model**

- sequelize model:generate --name User --attributes firstName:string, lastName:string, email:string
    - create a model file User in models folder
    - create a migration file with name like *****-create-user.js in migration folder
    
3. **Running Migrations**
    
- sequelize db:migrate
    - it create a table called USers with all columns as specified in migration file
    
4. **Undoing Migrations**

- sequelize db:migrate:undo (for revert most recent migration)
- sequelize db:migrate:undo:all (for revert back to initial state )

5. **Creating First Seed**

- sequelize seed:generate --name demo-user
    - it will create seed file(like ******-demo-user.js) in seeders folder. It follows up/down semantics .
    
6. **Running Seeds**

- sequelize db:seed:all
    - it will execute that seed file and hava a demo-user inserted into User table.
    
7. **Undoing Seeds**

- sequelize db:seed:undo    (for undo most recent seed)
- sequelize db:seed:undo:all    ( for undo all seed)


