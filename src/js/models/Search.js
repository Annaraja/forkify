import * as SearchView from '../views/SearchView';


export default class Search{
constructor(query){
    this.query=query;
}

 getResults(){
// api key 1f7711a825e7ea81522c16e446e6502c
//xhr.open('GET',proxy+url+`key=${key}&q=${this.query}`);
//const key="1f7711a825e7ea81522c16e446e6502c";
//const proxy="http://cors.io/"
//const url="https://www.food2fork.com/api/search?";

//this.result=await fetchResult();
const query =SearchView.getInputValue();

return new Promise(resolve=>{
    const url=`http://localhost:8082/EmployeeForm/employee/getFood/query/${query}`;
    var xhr=new XMLHttpRequest();
    var response;
    xhr.open('GET',url,true);
    xhr.setRequestHeader( 'Content-Type', 'application/json' );
    xhr.withCredentials = true
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200){
    response=JSON.parse(xhr.responseText);
    resolve(response);
        }
    }
    xhr.send(); 
})

}

}