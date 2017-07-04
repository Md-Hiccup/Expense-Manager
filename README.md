# Expense-Manager
Creating totalExpense by adding Items and Price to get the total estimate cost of the month. Expense-Manager is build in nodejs with mysql using sequelize.

<<<<<<< HEAD
**Set Mysql sql_mode _ONLY_FULL_GROUP_BY = "";_**

## API Post request
*check in postman*
###### user request

1. **/signup**
```
- name
- email
=======
## API Post request 
*check in postman*
###### user request 

1. **/signup**
```
- name 
- email 
>>>>>>> e8469182c235bfdd81887198880a3a26687ded67
- password
```
2. **/login**
```
- email
- password
<<<<<<< HEAD
```
=======
```        
>>>>>>> e8469182c235bfdd81887198880a3a26687ded67
3. **/addItems**
```
- name
- price
- uid
- dates ( yyyy-mm-dd )
```
4. **/itemList**
```
- uid
```
5. **/totalPrice**
```
- uid
```
6. **/dailyExp**
```
- uid
- dates ( yyyy-mm-dd )
```
7. **/monthlyExp**
```
- uid
- month ( mm )
```
8. **/weeklyExp**
```
- uid
- week
```
9. **/quarterExp**
```
<<<<<<< HEAD
- uid
- quarter
```
=======
- uid 
- quarter
```
>>>>>>> e8469182c235bfdd81887198880a3a26687ded67
