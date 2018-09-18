function getColor(level){
  switch(level) {

    case "error":
    case 1:
    return "\x1b[31m";

    case "warn":
    case 2: 
    return "\x1b[33m";
    
    case "info":
    case 3: 
    return "\x1b[32m";
    
    case "debug":
    case 4: 
    return "\x1b[35m"; 
    
    case "silly":
    case 5: 
    return "\x1b[37m";

    default: 
    return "\x1b[37m";

  }
}


let looo = function(data){
  let color = getColor(arguments[arguments.length-1]); 
  console.info(color, "custom logger", data);
}

global.console.log = looo;

module.exports = looo;
