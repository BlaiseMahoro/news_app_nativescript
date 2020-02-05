const Observable = require("tns-core-modules/data/observable").Observable;
const api_key = "b3159ffc028a41ab8fdd336e9e6cb2a1";
var query="";
var url =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
    api_key+"&q="+query;
const frame = require("tns-core-modules/ui/frame");
const getViewById = require("tns-core-modules/ui/core/view").getViewById;
var search = "";
function createViewModel(page) {
    const viewModel = new Observable();

    fetch(url)
        .then(r => {
            //console.log("Blaise");
            return r.json();
        })
        .then(json => {
            console.log(json.articles);
            viewModel.set("articles", json.articles);
        });

    //viewModel.set("text","Hi");
    var theme, fontSize;
    var bgColor, textColor, size;

    //Check if settings are set up
    if (page.navigationContext) {
        theme = page.navigationContext.theme;
        fontSize = page.navigationContext.fontSize;
    } else {
        theme = "dark";
        fontSize = "regular";
    }

    if (theme === "dark") {
        bgColor = "black";
        textColor = "white";
    } else {
        bgColor = "white";
        textColor = "black";
    }

    if (fontSize === "regular") {
        size = "10";
    } else {
        size = "20";
    }
    //console.log(textColor);
    viewModel.set("bgColor", bgColor);
    viewModel.set("textColor", textColor);
    viewModel.set("size", size);
    
    //search 
    viewModel.onSearchTap=()=>{
        const page = frame.topmost().currentPage;
        query = getViewById(page,"search_id").text;
        //console.log("query", query);
        viewModel.set("search","");
        url ="https://newsapi.org/v2/top-headlines?country=us&apiKey=" +api_key+"&q="+query;
        search ="showing results for "+query;
        
        //console.log("Url", url)
        fetch(url)
        .then(r => {
            //console.log("Blaise");
            return r.json();
        })
        .then(json => {
            console.log(json.articles);
            viewModel.set("articles", json.articles);
        });
        if(query.trim().length){
            
            viewModel.set("search",search);
        }else{
            viewModel.set("search","Showing all articles");   
        }
    }
    viewModel.onItemTap = args => {
        const article = args.view.bindingContext;
        console.log("url  ", article.url);
        frame.topmost().navigate({
            moduleName: "detail/detail-page",
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            },
            context: {
                title: article.title,
                url: article.url,
                urlToImage: article.urlToImage,
                content: article.content,
                theme: theme,
                fontSize: fontSize
            }
        });

        //console.log(args.view.bindingContext);
    };

    viewModel.onSettingsTap = () => {
        frame.topmost().navigate({
            moduleName: "settings/settings-page",
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            },
            context: {
                theme: theme,
                fontSize: fontSize
            }
        });
    };

    return viewModel;
}

exports.createViewModel = createViewModel;
