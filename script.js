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

    console.log(sortRequiredRange3());
