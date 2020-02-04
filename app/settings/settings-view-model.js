const Observable = require("tns-core-modules/data/observable").Observable;
const api_key ="b3159ffc028a41ab8fdd336e9e6cb2a1";
const url = "https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey="+api_key;
const frame = require("tns-core-modules/ui/frame");
var themes = ["dark","light"]
var fonts = ["regular","large"]
const getViewById = require("tns-core-modules/ui/core/view").getViewById;

function createViewModel(page) {
    const viewModel = new Observable();
   
    viewModel.set("themes",themes);
    viewModel.set("fonts", fonts);
    const context = page.navigationContext;
    var {theme, fontSize}= context;
    var curr_theme = themes.indexOf(theme);
    var curr_font= fonts.indexOf(fontSize);

    viewModel.set("curr_theme", curr_theme);
    viewModel.set("curr_font", curr_font);
    var bgColor, textColor,  size;
    if(theme==="dark"){

        bgColor="black";
        textColor = "white";
    }else{
        bgColor = "white";
        textColor = "black";
    }


    if(fontSize==="regular"){
        size = "10"
    }else{
        size = "20"
    }
    viewModel.set("bgColor", bgColor);
    viewModel.set("size", size);
    viewModel.set("textColor", textColor);
 

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
    
    viewModel.onApplyTap=()=>{
        const page = frame.topmost().currentPage;
        const lpicker1 = getViewById(page,"theme-pick");
        theme = themes[lpicker1.selectedIndex];
          
        const lpicker2 = getViewById(page,"font-pick");
        fontSize = fonts[lpicker2.selectedIndex];

        frame.topmost().navigate({
            moduleName: "settings/settings-page",
            // transition: {
            //     name: "slide",
            //     duration: 20,
            //     curve: "easeIn"
            // },
            context: {
                theme: theme,
                fontSize: fontSize
            }
        });
    }
    //     if(theme==="dark"){

    //         bgColor="black";
    //         textColor = "white";
    //     }else{
    //         bgColor = "white";
    //         textColor = "black";
    //     }    
    
    //     if(fontSize==="regular"){
    //         size = "10"
    //     }else{
    //         size = "20"
    //     }
    //     viewModel.set("bgColor", bgColor);
    //     viewModel.set("size", size);
    //     viewModel.set("textColor", textColor);
    //     curr_theme = themes.indexOf(theme);
    //     curr_font= fonts.indexOf(fontSize);
    //     viewModel.set("curr_theme", curr_theme);
    //     viewModel.set("curr_font", curr_font);
    // }

    return viewModel;
}

exports.createViewModel = createViewModel;
