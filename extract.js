// PDf extract
const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */


// write to text
var fs = require('fs');


pdfExtract.extract('test.pdf', options, (err, data) => {
    if (err) return console.log(err);
    //   console.log(data.pages[0].content);
    d = new Date().getTime();
    loging(data, `public/${d}.txt`)

});

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
