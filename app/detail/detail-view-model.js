const Observable = require("tns-core-modules/data/observable").Observable;

const utilsModule = require("tns-core-modules/utils/utils");
//const fetch = require("node-fetch");
const frame = require("tns-core-modules/ui/frame");

function createViewModel(page) {
    const viewModel = new Observable();
    const context = page.navigationContext
    const {title, url, urlToImage, content, theme, fontSize}= context
    var bgColor, textColor,  size;
    if(theme==="dark"){

        bgColor="black";
        textColor = "white";
    }else{
        bgColor = "white";
        textColor = "black";
    }


    if(fontSize==="regular"){
        size = "12"
    }else{
        size = "20"
    }
    console.log("Url ",url)
    viewModel.set("title",title);
    viewModel.set("url","Url: "+url);
    viewModel.set("urlToImage",urlToImage);
    viewModel.set("content",content);
    viewModel.set("bgColor",bgColor);
    viewModel.set("text", textColor);
    viewModel.set("size",size);

  
    //viewModel.set("articles",articles);
    // fetch(url).then((r)=>{
    //     //console.log("Blaise");
    //     return r.json();

    // }).then((json)=>{
    //     console.log(json.articles);
    //     viewModel.set('articles', json.articles);
    // })


    //viewModel.set("text","Hi");
    viewModel.onHomeTap = () => {
        frame.topmost().navigate({
            moduleName:"main/main-page",
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeIn"
            },
            context:{
                theme:theme,
                fontSize:fontSize,
            }
        });
    }
           
    viewModel.onReadTap = () => {
               
        utilsModule.openUrl(url);
    };
   

    return viewModel;
}

exports.createViewModel = createViewModel;
