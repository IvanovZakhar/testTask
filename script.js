    // Список курсов
    let courses = [
        { name: "Courses in England", prices: [0, 100] }, 
        { name: "Courses in Germany", prices: [500, null] }, 
        { name: "Courses in Italy", prices: [100, 200] }, 
        { name: "Courses in Russia", prices: [null, 400] },
        { name: "Courses in China", prices: [50, 250] },
        { name: "Courses in USA", prices: [200, null] },
        { name: "Courses in Kazakhstan", prices: [56, 324] },
        { name: "Courses in France", prices: [null, null] },
    ];

    // Варианты цен (фильтры), которые ищет пользователь
    let requiredRange1 = [null, 200];
    let requiredRange2 = [100, 350];
    let requiredRange3 = [200, null];

    // С помощью метода filter перебираем каждый выбранный вариант и помещаем его значение в функцию.
    function sortRequiredRange1 (){
        const result = courses.filter(obj => {
            
            const {prices} = obj;

            if((requiredRange1[0] <= prices[0] || requiredRange1[1] >= prices[1]) && 
               (requiredRange1[1] >= prices[0] )){
                return true;
            }
        });
        return result;
    }

    function sortRequiredRange2 (){
        const result = courses.filter(obj => {
            const {prices} = obj;
            if((requiredRange2[0] <= prices[0] || requiredRange2[1] >= prices[1]) && 
            (prices[0] <= requiredRange2[1]) || prices[1] >= requiredRange2[0]){
                return true;
            }
        });
        return result;
    }

    function sortRequiredRange3 (){
        const result = courses.filter(obj => {
            const {prices} = obj;
            if(requiredRange3[0] <= prices[0] || requiredRange3[0] <= prices[1]){
                return true;
            }
        });
        return result;
    }

    // Создаем таблицу для элементов

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);
    document.body.appendChild(table);
    
    // Класс, который будет генерировать курсы

    class Courses {
        constructor (name, prices, parentSelector, ...classes) {
            this.name = name;
            this.prices = prices;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        render() {

        // Проверка на наличие в блоке содержимого    
        
        const element = document.createElement('tr');
        if(this.classes.length === 0){
            this.classes = 'course__item';
            element.classList.add(this.classes);
        }else{
             this.classes.forEach(className => element.classList.add(className));
        }

        // Добавляем Элементы, с помощью инкрементов проверяем на наличие null и заменяем его
       
        element.innerHTML = `
                    <td class="course-name">
                        ${this.name}
                    </td>
                    <td class="salary">от 
                        ${this.prices[0]}  
                        ${(this.prices[1] == 0) ? '' : 'до ' + this.prices[1]}
                    </td>
        `;
        
        this.parent.append(element);
        }

        
    }

    

    for(let i = 0; i < 2; i++){
        const newArr = courses.findIndex(item => item.prices[0] == null);

        courses[newArr].prices[0] = 0;
    
    }

    // for(let i = 0; i < 3; i++){
    //     const newArr = courses.findIndex(item => item.prices[1] == null);

    //     courses[newArr].prices[1] = '';
    
    // }



    // Помещаем содержимое курсов в изменяемую переменную для иммутабельности.

    let currentValue = courses;

    // Генерируем содержимое переменной 

    currentValue.forEach(item => {
        new Courses(item.name, item.prices, '.course .container table').render();
    });

    // Функция которая будет отвечать за появление обновляемой информации согласно фильтру

    function showSelected (filter, checkbox) {
        // Т.к. чекбокс стоит по умолчанию без чека, то сразу при равниваем фильтр при клике.
        currentValue = filter; 

        // После чего достаем старые данные и удаляем их.
        const courseItem = document.querySelectorAll('.course__item');
        courseItem.forEach(item => item.remove());
        
        // Делаем проверку, если Check есть задаем значение фильтра, если нет устанавливаем перво-начальное значение.
        if (checkbox.checked == true){
            currentValue = filter;  
        }else{
            currentValue = courses;
        }

        // Генерируем класс на основе полученных данных.
        currentValue.forEach(item => {
            new Courses(item.name, item.prices, '.course .container table').render();
        });

    }

    // Получаем чекбоксы

    const checkboxRequiredRange1 = document.querySelector('.requiredRange1'),
    checkboxRequiredRange2 = document.querySelector('.requiredRange2'),
    checkboxRequiredRange3 = document.querySelector('.requiredRange3'),
    sortByLeters = document.querySelector('.sortByLeters'),
    sortBySalary = document.querySelector('.sortBySalary');

    // Устанавливаем обработчики событий на каждый из выбранных чекбоксов

    checkboxRequiredRange1.addEventListener('click', () => showSelected (sortRequiredRange1(), checkboxRequiredRange1));
    checkboxRequiredRange2.addEventListener('click', () => showSelected (sortRequiredRange2(), checkboxRequiredRange2));
    checkboxRequiredRange3.addEventListener('click', () => showSelected (sortRequiredRange3(), checkboxRequiredRange3));

    sortByLeters.addEventListener('click', () => {
        const courseItem = document.querySelectorAll('.course__item');
        courseItem.forEach(item => item.remove());
        currentValue = courses.sort(function(a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
          currentValue.forEach(item => {
            new Courses(item.name, item.prices, '.course .container table').render();
        });
    });

    sortBySalary.addEventListener('click', () => {
        const courseItem = document.querySelectorAll('.course__item');
        courseItem.forEach(item => item.remove());
        function compareNumbers(a, b) {
            return a.prices[1] - b.prices[0];
          }
    
       
        currentValue = courses.sort(compareNumbers);
        currentValue.forEach(item => {
            new Courses(item.name, item.prices, '.course .container table').render();
        });
    });



    // function compareNumbers(a, b) {
    //     return a.prices[0] + b.prices[0];
    //   }


  

    

   
    //   const newArr = courses.map.set('null', 0);
    //   console.log(newArr);



  