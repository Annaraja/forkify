
export default class   Receipe {

constructor(id){
this.id=id;
}

    async fetchReceipe(){
        var self=this;
       const promiseObj= new Promise(resolve=>{
            var response;
            const url=`http://localhost:8082/EmployeeForm/employee/getPizzaId/${self.id}`;
            var xhr=new XMLHttpRequest();
            xhr.open('GET',url,true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.withCredentials=true;
            xhr.onreadystatechange=()=>{
                if(xhr.status==200 && xhr.readyState==4){
                response=JSON.parse(xhr.responseText);
                resolve(response);
                }
            }
            xhr.send();
        
        });
       const objects= await promiseObj;
       this.publisher=objects.publisher;
       this.f2f_url=objects.f2f_url;
       this.title=objects.title;
       this.source_url=objects.source_url;
       this.image_url=objects.image_url;
       this.social_rank=objects.social_rank;
       this.ingredients=objects.ingredients;
       this.publisher_url=objects.publisher_url;
       this.recipe_id=objects.recipe_id;
       return this;
        }
calcTime(){
const numIng=this.ingredients.length;
const periods=Math.ceil(numIng/3);
this.time=periods*15;
}

calcServings(){
    this.servings=4;
}


parseIng(){

// proper units

const longUnits=['tablespoons','tablespoon','teaspoons','teaspoon','ounces','ounce','cups','cup','pounds','slices'];
const shortUnits=['tbsp','tbsp','tsp','tsp','oz','oz','cup','cup','pound','slice'];
let ingredientses;
let objIng={};
ingredientses=this.ingredients.map(element => {

   
    let ingredient=element.toLowerCase();
    longUnits.forEach((units,i) => {
        ingredient= ingredient.replace(units,shortUnits[i]);
    });

    //Remove paranthesis
    ingredient=ingredient.replace(/ *\([^)]*\) */g, "");
  //  let objIng={}
let arrIng=ingredient.split(' ');

// seperate unit
let counts;
let unitIndex=arrIng.findIndex(el2=>shortUnits.includes(el2));
if(unitIndex>-1){
let arrayCount=arrIng.slice(0,unitIndex);
if(arrayCount.length==1){
counts=eval(arrIng[0].replace('-','+'));
}else{
counts=eval(arrIng.slice(0,unitIndex).join('+'));
}
objIng={
    count:counts,
    unit:arrIng[unitIndex],
ingredient:arrIng.slice(unitIndex+1).join(' ')
}
}else if((parseInt(element[0],10))){
    objIng={
        count:parseInt(element[0],10),
        unit:'',
        ingredient:arrIng.slice(1).join(' ')
    }
}else if(unitIndex==-1){
objIng={
    count:1,
    unit:'',
    ingredient
}
}

return objIng;
});
this.ingredients=ingredientses;
}

updateServingsIng(type){
const newServings= type=='inc'? this.servings+1:this.servings-1;
this.ingredients.forEach(ing=>{
    ing.count*=(newServings)/this.servings;
})
this.servings=newServings;
}


}