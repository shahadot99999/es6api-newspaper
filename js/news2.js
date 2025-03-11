//console.log("java script added");


//create loadData
const loadNewsData = () =>{
    //console.log("data is loaded");
    fetch("https://newsapi.org/v2/everything?q=tesla&from=2025-02-11&sortBy=publishedAt&apiKey=451352e5a6d547cea728fa6778657d3c")
    //.then ((res)=>console.log(res))
    .then((res)=>res.json())
    //.then((data)=>console.log(data.articles))
    .then((data)=>displayDatas(data.articles))
    .catch((error)=>console.log(error));
};

//displayData
const displayDatas=(data)=>{
    //add data
    console.log(data);
}


loadNewsData();