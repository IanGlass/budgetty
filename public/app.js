// Written using the module pattern where objects are hidden from the global scope using IFFEs. Modules are exposed to other modules by passing them into the argument of the parent module in the IFFE declaration
//Each of the returned methods have access to methods within their respective IFFEs but outer modules do not


var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Add prototype method to Expense object to calculate the percentage as a function of the total income
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = 0;
        }
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0,
        },
        budget: 0,
        // Percentage of expenses vs income
        percentage: 0,
    }

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(element) {
            sum += element.value;
        });
        data.totals[type] = sum;
    }

    return {
        addItem: function(type, des, val) {
            var id, newItem;
            // Find the next incremental id within the selected allItems array
            (data.allItems[type].length > 0 ? id = data.allItems[type][data.allItems[type].length - 1].id + 1 : id = 0);

            if (type === 'exp') {
                data.allItems.exp.push(new Expense(id, des, val));
                return data.allItems.exp[data.allItems.exp.length - 1];
            } else if (type === 'inc') {
                data.allItems.inc.push(new Income(id, des, val));
                return data.allItems.inc[data.allItems.inc.length - 1];
            }
        },
        calculateBudget: function() {
            calculateTotal('inc');
            calculateTotal('exp');

            data.budget = data.totals.inc - data.totals.exp;

            // Prevent division by zero -> infinity
            if (data.totals.inc > 0) {
                data.percentage = (Math.round((data.totals.exp / data.totals.inc) * 100));
            } else {
                data.percentage = 0;
            }

            return {
                income: data.totals.inc,
                expenses: data.totals.exp,
                budget: data.budget,
                percentage: data.percentage,
            }
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(item) {
                item.calcPercentage(data.totals.inc);
            });
        },
        
        getPercentages: function() {
            var allPercentages = data.allItems.exp.map(function(item) {
                return item.percentage;
            });
            return allPercentages;
        },

        deleteData: function(type, id) {
            // Remove the item from the data obj
            data.allItems[type].map(function(item, index) {
                if (item.id == id) {
                    data.allItems[type].splice(index, 1);
                }
            });
        }
    }
})();

var UIController = (function() {

    // Predefine DOM class names for modularity
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetValue: '.budget__value',
        budgetIncome: '.budget__income--value',
        budgetExpenses: '.budget__expenses--value',
        budgetExpensesPercentage: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        monthLabel: '.budget__title--month',
        inputType: '.add__type'
    }

    var displayMonth = function() {
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        date = new Date();
        document.querySelector(DOMStrings.monthLabel).textContent = months[date.getMonth()] + ' ' + date.getFullYear();
    };
    displayMonth();

    // Clears the input fields after it has been added to the DOM table
    var clearFields = function() {
        var fields, fieldsArr;
        fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
        
        // Trick array into thinking fields is an array and not a string
        fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(current) {
            current.value = "";
        });

        fieldsArr[0].focus();
    }

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    }

    return {
        // Expose DOMStrings to calling modules
        DOMStrings: DOMStrings,
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                // Cast the string to a float for calculations 
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        addListItem: function(obj, type) {
            var html, newHtml, element;
            if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">- %value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
    
            } else if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }
            // Populate html with respective data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value.toLocaleString('en', { minimumFractionDigits: 2 }));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            clearFields();
        },
        deleteListItem: function(id) {
            document.getElementById(id).remove();
        },
        displayBudget: function(obj) {
            document.querySelector(DOMStrings.budgetValue).textContent = obj.budget.toLocaleString('en', { minimumFractionDigits: 2 });
            document.querySelector(DOMStrings.budgetIncome).textContent = '+ ' +  obj.income.toLocaleString('en', { minimumFractionDigits: 2 });
            document.querySelector(DOMStrings.budgetExpenses).textContent = '- ' +  obj.expenses.toLocaleString('en', { minimumFractionDigits: 2 });
            document.querySelector(DOMStrings.budgetExpensesPercentage).textContent = obj.percentage + '%';
        },
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
            nodeListForEach(fields, function(current, index) {
                current.textContent = percentages[index] + '%';
            });
        },
        changedType: function() {
            var fields = document.querySelectorAll(
                DOMStrings.inputType +',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.addButton).classList.toggle('red');
        }
    };

})();

 // Global app controller
 var Controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        document.querySelector(UICtrl.DOMStrings.addButton).addEventListener('click', ctrlAddItem);

        // Add event listener to the document for 'Enter' key press, compatible with older browsers
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13 ) {
                ctrlAddItem();
            }
        });

        document.querySelector(UICtrl.DOMStrings.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(UICtrl.DOMStrings.inputType).addEventListener('change', UICtrl.changedType);
    };

    // Calculate and update budget
    var updateBudget = function() {
        var budgetData = budgetCtrl.calculateBudget();
        UICtrl.displayBudget(budgetData);
    }

    // Updates the percentages of individual expenses whenever something is added or removed
    var updatePercentages = function() {
        budgetCtrl.calculatePercentages();
        var percentages = budgetCtrl.getPercentages();
        UICtrl.displayPercentages(percentages);
    }
    
    var ctrlAddItem = function() {
        // Grab the inputs from the DOM
        var input = UICtrl.getInput();

        // Don't allow blank inputs
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            UICtrl.addListItem(newItem, input.type);

            updateBudget();
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            const [type, ID] = itemID.split('-');
            budgetController.deleteData(type, ID);
            updateBudget();
            UIController.deleteListItem(itemID);
            updatePercentages();
        }
    }

    return {
        init: function() {
            setupEventListeners();
        },
    }
    
})(budgetController, UIController);

// Initialise the main controller
Controller.init()