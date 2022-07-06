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

            // Создаем таблицу
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');
    
            table.appendChild(thead);
            table.appendChild(tbody);
            document.body.appendChild(table);
    
    

    class Courses {
        constructor (name, prices, parentSelector, ...classes) {
            this.name = name;
            this.prices = prices;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        render() {


        const element = document.createElement('tr');
        if(this.classes.length === 0){
            this.classes = 'course__item';
            element.classList.add(this.classes);
        }else{
             this.classes.forEach(className => element.classList.add(className));
        }
       
        element.innerHTML = `
                    <td class="user-id">
                        ${this.name}
                    </td>
                    <td class="user-name">от 
                        ${this.prices[0] == null ? '0' : this.prices[0]}  
                        ${(this.prices[1] == null) ? '' : 'до ' + this.prices[1]}
                    </td>
        `;
        
        this.parent.append(element);
        }

        
    }

    const checkboxRequiredRange1 = document.querySelector('.requiredRange1'),
    checkboxRequiredRange2 = document.querySelector('.requiredRange2'),
    checkboxRequiredRange3 = document.querySelector('.requiredRange3');
    let currentValue = courses;

    currentValue.forEach(item => {
        new Courses(item.name, item.prices, '.admin .container table').render();
    });

    checkboxRequiredRange1.addEventListener('click', () => {
      if (checkboxRequiredRange1.checked != true){
          currentValue = sortRequiredRange1();
          console.log(courses);
          currentValue.forEach(item => {
            new Courses(item.name, item.prices, '.admin .container table').render();
        });
      }

    });





    console.log(sortRequiredRange3());
