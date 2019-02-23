# Budgetty
Budgetty is a budgetting app which takes a series of incomes and expenses and calculates the remaining disposable income. The list of incomes and expenses are shown with descriptions along with buttons to delete a respective item. Each expense also displays it's percentage of the total available income. The interface provides four points of interaction, the input type (income or expense), the input description, the input value and a button. The input panel changes from blue to red depending if an income or an expense is currently selected.

<p align="center">
<img src="https://github.com/IanGlass/Budgetty/blob/master/Budgetty.png" width="900">
</p>


This app is written in ES5 using the module pattern where objects are hidden from the global scope using IFFEs. Modules are exposed to other modules by passing them as arguments during the IFFE declaration. Closures are leveraged to create private methods only available in their parent objects.

https://budgetty.herokuapp.com/



#### HTML
HTML description and code

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,600" rel="stylesheet" type="text/css">
        <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
        <link type="text/css" rel="stylesheet" href="style.css">
        <title>Budgety</title>
    </head>
    <body>
        
        <div class="top">
            <div class="budget">
                <div class="budget__title">
                    Available Budget in <span class="budget__title--month">%Month%</span>:
                </div>
                
                <div class="budget__value">+ 0</div>
                
                <div class="budget__income clearfix">
                    <div class="budget__income--text">Income</div>
                    <div class="right">
                        <div class="budget__income--value">+ 0</div>
                        <div class="budget__income--percentage">&nbsp;</div>
                    </div>
                </div>
                
                <div class="budget__expenses clearfix">
                    <div class="budget__expenses--text">Expenses</div>
                    <div class="right clearfix">
                        <div class="budget__expenses--value">- 0</div>
                        <div class="budget__expenses--percentage">0%</div>
                    </div>
                </div>
            </div>
        </div>
        
        
        
        <div class="bottom">
            <div class="add">
                <div class="add__container">
                    <select class="add__type">
                        <option value="inc" selected>+</option>
                        <option value="exp">-</option>
                    </select>
                    <input type="text" class="add__description" placeholder="Add description">
                    <input type="number" class="add__value" placeholder="Value">
                    <button class="add__btn"><i class="ion-ios-checkmark-outline"></i></button>
                </div>
            </div>
            
            <div class="container clearfix">
                <div class="income">
                    <h2 class="icome__title">Income</h2>
                    
                    <div class="income__list">
                        
                    </div>
                </div>
                
                <div class="expenses">
                    <h2 class="expenses__title">Expenses</h2>
                    
                    <div class="expenses__list">
                        
                    </div>
                </div>
            </div>
            
            
        </div>
        
        <script src="app.js"></script>
    </body>
</html>
```


#### Budget Controller


#### UI Controller


#### App controller