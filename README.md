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
