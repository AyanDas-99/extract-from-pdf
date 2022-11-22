// PDf extract
const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */


// write to text
var fs = require('fs');


function storeToFile(p) {
    d = new Date().getTime();
    const Filename = d + '.txt';
    console.log(Filename)
    pdfExtract.extract(p, options, (err, data) => {
        if (err) return console.log(err);
        //   console.log(data.pages[0].content);
        loging(data, `public/` + Filename)
    });

    return Filename;
}
function loging(data, fileName) {


    var stream = fs.createWriteStream(fileName);
    stream.once('open', function (fd) {


        data.pages.forEach(page => {
            page.content.forEach(element => {
                // console.log(element.str);
                stream.write(element.str + "\n");
            })
        });


        stream.end();
    });
}


module.exports = { storeToFile }