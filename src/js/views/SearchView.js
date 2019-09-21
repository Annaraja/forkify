import {elements} from './base';


export const getInputValue=()=>elements.searchField.value;

export const setInputEmptyValue=()=>{
    elements.searchField.value='';
elements.resultPage.innerHTML='';
};

export const setNullList=()=>elements.resultList.innerHTML='';

export const limiter=(receipe,limit=17)=>{
    if(receipe.length>limit){ 
        let newArray=[];  
   let values= receipe.split(' ');
   values.reduce((accumalator,curr)=>{
if(accumalator+curr.length<limit){
    newArray.push(curr);
}
return accumalator+curr.length;
  },0);

  if(newArray.length==0){
newArray.push(values[0].slice(0,limit));
  }
return `${newArray.join(' ')}...`;
}
return receipe;
}

export const removeSpinner=()=>{
let loader=document.querySelector('.loader');
if(loader){
let parent=loader.parentElement;
parent.removeChild(loader);
}
}


export const highlightSelected=(id)=>{
   const arr= Array.from(document.querySelectorAll('.results__link'));
arr.forEach(el=>{
el.classList.remove('results__link--active');
});

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}


export const spinner= parent=>{
    const html=`
    <div class="loader">
    <svg>
    <use href="img/icons.svg#icon-cw"></use>
    </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin',html);
}

/**
 * Individual receipes
 * @param {*} receipe 
 */
const renderReceipe=receipe=>{
 const html=`
 <li>
 <a class="results__link " href="#${receipe.recipe_id}">
     <figure class="results__fig">
         <img src="${receipe.image_url}" alt="Test">
     </figure>
     <div class="results__data">
         <h4 class="results__name">${limiter(receipe.title)}</h4>
         <p class="results__author">${receipe.publisher}</p>
     </div>
 </a>
</li>
 `;
 elements.resultList.insertAdjacentHTML('beforeend',html);
}

export const setEmptyData=()=>{
    const html=`
    <figure >
         <img src="img/nodata.png" class="nodata__fig">
     </figure>
    `;
    elements.receipTag.insertAdjacentHTML('afterbegin',html);
}

/**
 * Forms navigation button
 * @param {*} page 
 * @param {*} type 
 */
const createButton=(page,type)=>{
return `
<button class="btn-inline results__btn--${type}" data-goto=${ type=='prev'? page-1:page+1}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type=='prev'?'left':'right'}"></use>
</svg>
<span>Page ${ type=='prev'? page-1:page+1}</span>
</button>
`;

};


const buttonRenderer=(limit=10,page=1,resultSet)=>{
    const totalPages=Math.ceil(resultSet/limit);
    let button;
if(page==1&&totalPages>1){
button=createButton(page,'next');
}else if(page>1 && page<totalPages){
button=`
${button=createButton(page,'prev')}
${button=createButton(page,'next')}
`;
}else if(page==totalPages && totalPages>1){
    button=createButton(page,'prev');
}
if(button)
elements.resultPage.insertAdjacentHTML('afterbegin',button);
};


/**
 * Append the search results
 * @param {*} receipes 
 * @param {*} page 
 * @param {*} limit 
 */
export const renderReceipeList=(receipes,page=1,limit=10)=>{
    limit=receipes.length<limit? receipes.length:limit; 
    const start=(page-1)*limit;
    const end=page*limit;
    receipes.slice(start,end).forEach((receipe)=>renderReceipe(receipe));
    buttonRenderer(limit,page,receipes.length);
};

export const clearButtons=()=>{
    elements.resultPage.innerHTML="";
}