$('#search-destination').click(function(){
    window.location.href = "Schedule.html?dest="+$("#destinations-searchbox").val();
})
dest = {
  "Dest": [
    "\u014cta, Tokyo, Japan", 
    "Chicago, Illinois, United States", 
    "Pudong, Shanghai, China", 
    "Los Angeles, California, United States", 
    "Delhi, India", 
    " Xiaoshan ,Hangzhou, Zhejiang, China", 
    "Charlotte, North Carolina, United States", 
    "Garhoud, Dubai, United Arab Emirates", 
    "Arnavutk\u00f6y, Istanbul, Turkey", 
    "Roissy-en-France, \u00cele-de-France, France", 
    "Hillingdon, London, United Kingdom", 
    "Venustiano Carranza, Mexico City, Mexico", 
    "Phoenix, Arizona, United States", 
    "T\u00e2n B\u00ecnh District, Ho Chi Minh City, Vietnam", 
    "Orlando, Florida, United States", 
    " Xinzheng ,Zhengzhou, Henan, China", 
    "Jeju City, Jeju Province, South Korea", 
    "Haarlemmermeer, North Holland, Netherlands", 
    "Guarulhos, Brazil", 
    "SeaTac, Washington, United States", 
    "Jiangning District,Nanjing, Jiangsu, China        "
  ]
}
$('#destinations-searchbox').autocomplete({
    disabled:true,
      source: dest["Dest"],
    appendTo:"#destination-autocomplete-list",
      classes: {
    "ui-autocomplete": ""
  }
    });

dest["Dest"].forEach(
    function(element){
        $("#datalistOptions").append(`<option value="${element}">`)
    }

)
$('#logout-button').click(
    function(){firebase.auth().signOut();}
)