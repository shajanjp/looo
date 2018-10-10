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
    
    default: 
    return "\x1b[37m";
  }
}

let looo = {
  log: (...data) => {
    return new Promise((resolve, reject) => {
      console.log(...data);
      resolve({});
    });
  },
  info: (...data) => {
    return new Promise((resolve, reject) => {
      console.info(getColor("info"), ...data);
      resolve({});
    });
  },
  warn: (...data) => {
    return new Promise((resolve, reject) => {
      console.warn(getColor("warn"), ...data);
      resolve({});
    });
  },
  error: (...data) => {
    return new Promise((resolve, reject) => {
      console.error(getColor("error"), ...data);
      resolve({});
    });
  }
}

global.looo = looo;
module.exports = looo;