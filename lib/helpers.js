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
    return "";
  }
}

function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

module.exports = {
    getColor,
    timeSince
}
