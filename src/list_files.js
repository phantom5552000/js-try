dateFormat = {
    fmt : {
      "yyyy": function(date) { return date.getFullYear() + ''; },
      "MM": function(date) { return ('0' + (date.getMonth() + 1)).slice(-2); },
      "dd": function(date) { return ('0' + date.getDate()).slice(-2); },
      "hh": function(date) { return ('0' + date.getHours()).slice(-2); },
      "mm": function(date) { return ('0' + date.getMinutes()).slice(-2); },
      "ss": function(date) { return ('0' + date.getSeconds()).slice(-2); }
    },
    format:function dateFormat (date, format) {
        var result = format;
        for (var key in this.fmt)
            result = result.replace(key, this.fmt[key](date));
        return result;
    }
};

function list_files(target, callback)
{
    var fs = require('fs');
    fs.readdir(target, function(err, files){
        if (err) throw err;
        var fileList = [];
        files.filter(function(file){
            var full_path = target_folder + file;
            return fs.statSync(full_path).isFile() 
        }).forEach(function (file) {
            var full_path = target_folder + file;
            var fss = fs.statSync(full_path);
            fileList.push([full_path, fss.ctime, fss.size]);
        });
        callback(fileList);
    });
};


function list_files_console(folder)
{
    list_files(folder, (file_list) => {
        var sprintf = require("sprintf-js").sprintf;
        for(var i=0; i < file_list.length; i++){
            f = file_list[i];
            console.log(sprintf("%s %10d %s ", dateFormat.format(f[1], 'yyyy/MM/dd hh:mm:ss'), f[2], f[0]));
        }
    });
}
// just a comment
var target_folder = process.argv[2];
if (typeof target_folder === "undefined"){
    target_folder = "./";
}
list_files_console(target_folder);



