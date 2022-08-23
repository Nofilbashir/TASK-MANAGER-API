export const  formatDate =()=> {
    var d = new Date(),
    
    // yeild date object like "Aug 21 2022 00:49:14 GMT+0500 (Pakistan Standard Time)"
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
  }

 export const  DateAfterSixMonth =()=> {

        const date = new Date();
        //add days to get date object after specified days
        date.setDate(date.getDate() + 1)
        var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');

  }





