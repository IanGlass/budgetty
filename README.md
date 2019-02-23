# Budgetty
Budgetty is a budgetting app which takes a series of incomes and expenses and calculates the remaining disposable income. The list of incomes and expenses are shown with descriptions along with buttons to delete a respective item. Each expense also displays it's percentage of the total available income. The interface provides four points of interaction, the input type (income or expense), the input description, the input value and a button. The input panel changes from blue to red depending if an income or an expense is currently selected.

<p align="center">
<img src="https://github.com/IanGlass/Budgetty/blob/master/Budgetty.png" width="900">
</p>


This app is written in ES5 using the module pattern where objects are hidden from the global scope using IFFEs. Modules are exposed to other modules by passing them as arguments during the IFFE declaration. Closures are leveraged to create private methods only available in their parent objects.

https://budgetty.herokuapp.com/



#### HTML
HTML description and code


#### Budget Controller


#### UI Controller


#### App controller